import axios from 'axios';
import * as FileSystem from 'expo-file-system/legacy';
import { DownloadProgress, FastAPIDirectURLResponse, FastAPIMetadataResponse, VideoMetadata } from '../types';

// FastAPI Backend URL
const API_URL = 'https://fastapi-u8bm.onrender.com';

/**
 * Sanitize filename to remove special characters that cause file system errors
 */
const sanitizeFilename = (filename: string): string => {
    try {
        // Decode URI component in case filename is URL-encoded (e.g. contains %20, %F0, etc.)
        filename = decodeURIComponent(filename);
    } catch (e) {
        // Continue with original filename if decoding fails
    }

    // Remove or replace problematic characters
    // Only allow alphanumeric, underscores, dashes, and dots
    return filename
        .replace(/[\r\n]+/g, ' ')           // Replace newlines with space
        .replace(/[^\w\-. ]/g, '')           // Remove everything that is NOT word, dot, dash, or space (removes emojis, #, @, %, etc.)
        .replace(/\s+/g, '_')                // Replace spaces with underscores
        .replace(/_{2,}/g, '_')              // Replace multiple underscores with single
        .replace(/^_+|_+$/g, '')             // Trim underscores from start/end
        .substring(0, 100)                   // Limit length to 100 characters
        || `video_${Date.now()}.mp4`;        // Fallback
};

/**
 * Fetch video metadata from FastAPI backend
 * Uses /api/metadata endpoint
 */
export const fetchVideoMetadata = async (url: string): Promise<VideoMetadata> => {
    try {
        console.log('Fetching metadata for:', url);

        const response = await axios.post<FastAPIMetadataResponse>(
            `${API_URL}/api/metadata`,
            { url: url },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('FastAPI metadata response:', JSON.stringify(response.data, null, 2));

        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.error || 'Failed to fetch video metadata');
        }

        const data = response.data.data;

        // Map FastAPI response to VideoMetadata
        return {
            url: url,
            title: data.title || 'Video',
            thumbnail: data.thumbnail || '',
            duration: data.duration || 0,
            platform: mapPlatform(data.platform),
            author: data.uploader || 'Unknown',
            uploader: data.uploader,
            filesize: data.filesize
        };
    } catch (error) {
        console.error('Error fetching video metadata:', error);
        if (axios.isAxiosError(error)) {
            console.error('API error details:', error.response?.data);
            throw new Error(error.response?.data?.error || error.response?.data?.detail || 'Failed to fetch video information');
        }
        throw new Error('Failed to fetch video information. Please check the URL and try again.');
    }
};

/**
 * Download video using direct URL from FastAPI backend
 * Uses /api/get-direct-url endpoint for zero server bandwidth
 */
export const downloadVideo = async (
    videoUrl: string,
    metadata: VideoMetadata,
    onProgress?: (progress: DownloadProgress) => void
): Promise<string> => {
    try {
        console.log('Getting direct download URL for:', videoUrl);

        // Step 1: Get direct URL from FastAPI
        const response = await axios.post<FastAPIDirectURLResponse>(
            `${API_URL}/api/get-direct-url`,
            { url: videoUrl },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('FastAPI direct URL response:', JSON.stringify(response.data, null, 2));

        if (!response.data.success || !response.data.data) {
            throw new Error(response.data.error || 'Failed to get download URL');
        }

        const { direct_url, filename } = response.data.data;

        if (!direct_url) {
            throw new Error('No download URL received from server');
        }

        console.log('Direct download URL:', direct_url);
        console.log('Original filename:', filename);

        // Step 2: Sanitize filename and download directly from source (zero server bandwidth!)
        const sanitizedFilename = sanitizeFilename(filename || `${Date.now()}_video.mp4`);
        console.log('Sanitized filename:', sanitizedFilename);

        const fileUri = `${FileSystem.documentDirectory}${sanitizedFilename}`;

        console.log('Starting download to:', fileUri);

        // Ensure we start fresh (delete partial file if exists) to avoid "Resume" issues on retry
        try {
            await FileSystem.deleteAsync(fileUri, { idempotent: true });
        } catch (e) {
            // Ignore error if file doesn't exist
        }

        // Download the video with progress tracking
        const downloadResumable = FileSystem.createDownloadResumable(
            direct_url,
            fileUri,
            {},
            (downloadProgress) => {
                const progress: DownloadProgress = {
                    totalBytes: downloadProgress.totalBytesExpectedToWrite,
                    downloadedBytes: downloadProgress.totalBytesWritten,
                    percentage:
                        downloadProgress.totalBytesExpectedToWrite > 0
                            ? (downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite) * 100
                            : 0,
                };
                console.log(`Download progress: ${progress.percentage.toFixed(2)}%`);
                onProgress?.(progress);
            }
        );

        const result = await downloadResumable.downloadAsync();

        if (!result) {
            throw new Error('Download failed');
        }

        console.log('Download completed:', result.uri);
        return result.uri;
    } catch (error) {
        console.error('Error downloading video:', error);
        if (axios.isAxiosError(error)) {
            console.error('Axios error details:', error.response?.data);
            throw new Error(error.response?.data?.error || error.response?.data?.detail || 'Failed to download video');
        }
        throw new Error(error instanceof Error ? error.message : 'Failed to download video. Please try again.');
    }
};

/**
 * Get thumbnail URL with CORS proxy
 */
export const getThumbnailUrl = (thumbnailUrl: string): string => {
    if (!thumbnailUrl) return '';
    // Use FastAPI's thumbnail proxy to bypass CORS
    return `${API_URL}/api/thumbnail?url=${encodeURIComponent(thumbnailUrl)}`;
};

/**
 * Map platform name from FastAPI to app's platform type
 */
const mapPlatform = (platform: string): VideoMetadata['platform'] => {
    const platformLower = platform.toLowerCase();

    if (platformLower.includes('instagram')) return 'instagram';
    if (platformLower.includes('tiktok')) return 'tiktok';
    if (platformLower.includes('youtube')) return 'youtube';
    if (platformLower.includes('facebook')) return 'facebook';
    if (platformLower.includes('twitter') || platformLower.includes('x.com')) return 'twitter';
    if (platformLower.includes('vimeo')) return 'vimeo';
    if (platformLower.includes('reddit')) return 'reddit';

    return 'other';
};
