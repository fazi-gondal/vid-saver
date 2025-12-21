import axios from 'axios';
import * as FileSystem from 'expo-file-system/legacy';
import { DownloadProgress, VideoMetadata } from '../types';
import { getPlatformFromUrl } from '../utils/urlValidator';

// API endpoints for different platforms
// Using Social Media Video Downloader API from RapidAPI
const RAPIDAPI_URL = 'https://social-media-video-downloader.p.rapidapi.com';
const RAPIDAPI_KEY = 'a0216edab5mshc5e28240b40efe4p124a7cjsn4d45d045a1b9';
const RAPIDAPI_HOST = 'social-media-video-downloader.p.rapidapi.com';
const TIKWM_API = 'https://www.tikwm.com/api';

// Helper function to extract Instagram shortcode from URL
const extractInstagramShortcode = (url: string): string | null => {
    // Instagram URLs can be in formats:
    // https://www.instagram.com/reel/SHORTCODE/
    // https://www.instagram.com/p/SHORTCODE/
    // https://www.instagram.com/tv/SHORTCODE/
    const match = url.match(/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/);
    return match ? match[1] : null;
};

// Get platform-specific endpoint for TikTok
const getTikTokEndpoint = (url: string): string => {
    // TikWM API format: /api/?url={videoUrl}?hd=1
    return `${TIKWM_API}/?url=${encodeURIComponent(url)}?hd=1`;
};

export const fetchVideoMetadata = async (url: string): Promise<VideoMetadata> => {
    try {
        const platform = getPlatformFromUrl(url);

        if (platform === 'tiktok') {
            // Use TikWM API for TikTok
            const endpoint = getTikTokEndpoint(url);
            const response = await axios.get(endpoint);

            console.log('TikWM API Response:', JSON.stringify(response.data, null, 2));

            if (response.data.code !== 0 || !response.data.data) {
                throw new Error(response.data.msg || 'Failed to fetch TikTok video metadata');
            }

            const videoData = response.data.data;

            return {
                url: url,
                title: videoData.title || 'TikTok Video',
                thumbnail: videoData.cover || videoData.origin_cover || '',
                platform: 'tiktok',
                author: videoData.author?.nickname || videoData.author?.unique_id,
            };
        } else {
            // Use Social Media Video Downloader for Instagram
            console.log('Using Social Media Video Downloader for Instagram:', url);

            // Extract shortcode from Instagram URL
            const shortcode = extractInstagramShortcode(url);
            if (!shortcode) {
                throw new Error('Invalid Instagram URL - could not extract shortcode');
            }

            const response = await axios.get(
                `${RAPIDAPI_URL}/instagram/v3/media/post/details`,
                {
                    params: {
                        shortcode: shortcode,
                        renderableFormats: '720p,highres'
                    },
                    headers: {
                        'x-rapidapi-key': RAPIDAPI_KEY,
                        'x-rapidapi-host': RAPIDAPI_HOST
                    }
                }
            );

            console.log('Instagram API Response:', JSON.stringify(response.data, null, 2));

            // Check if we got a valid response
            if (!response.data) {
                throw new Error('No data received from Instagram API');
            }

            const videoData = response.data;

            // Extract metadata from the response
            return {
                url: url,
                title: videoData.title || videoData.caption || 'Instagram Video',
                thumbnail: videoData.thumbnail_url || videoData.cover_url || videoData.picture || '',
                platform: 'instagram',
                author: videoData.username || videoData.owner?.username || 'Instagram User',
            };
        }
    } catch (error) {
        console.error('Error fetching video metadata:', error);
        if (axios.isAxiosError(error)) {
            console.error('API error details:', error.response?.data);
        }
        throw new Error('Failed to fetch video information. Please check the URL and try again.');
    }
};

export const downloadVideo = async (
    videoUrl: string,
    metadata: VideoMetadata,
    onProgress?: (progress: DownloadProgress) => void
): Promise<string> => {
    try {
        const platform = getPlatformFromUrl(videoUrl);

        console.log('Downloading video from:', videoUrl);
        console.log('Platform:', platform);

        let downloadUrl: string | undefined;

        if (platform === 'tiktok') {
            // Use TikWM API for TikTok
            const endpoint = getTikTokEndpoint(videoUrl);
            console.log('Using TikWM endpoint:', endpoint);

            const response = await axios.get(endpoint);
            console.log('TikWM API Response:', JSON.stringify(response.data, null, 2));

            if (response.data.code !== 0 || !response.data.data) {
                throw new Error(response.data.msg || 'Failed to get TikTok video');
            }

            const videoData = response.data.data;
            console.log('TikTok video data:', JSON.stringify(videoData, null, 2));

            // TikWM returns HD video in 'hdplay' or 'play' field
            downloadUrl = videoData.hdplay || videoData.play || videoData.wmplay;

            if (!downloadUrl) {
                console.error('No download URL found. Available fields:', Object.keys(videoData));
                throw new Error(`No download URL found in TikTok response. Available fields: ${Object.keys(videoData).join(', ')}`);
            }
        } else {
            // Use Social Media Video Downloader for Instagram
            console.log('Using Social Media Video Downloader for Instagram video download:', videoUrl);

            // Extract shortcode from Instagram URL
            const shortcode = extractInstagramShortcode(videoUrl);
            if (!shortcode) {
                throw new Error('Invalid Instagram URL - could not extract shortcode');
            }

            const response = await axios.get(
                `${RAPIDAPI_URL}/instagram/v3/media/post/details`,
                {
                    params: {
                        shortcode: shortcode
                    },
                    headers: {
                        'x-rapidapi-key': RAPIDAPI_KEY,
                        'x-rapidapi-host': RAPIDAPI_HOST
                    }
                }
            );

            console.log('Instagram API Response:', JSON.stringify(response.data, null, 2));

            // Check if we got a valid response
            if (!response.data || !response.data.contents || !Array.isArray(response.data.contents)) {
                throw new Error('No data received from Instagram API');
            }

            // The API response structure: contents is an ARRAY
            // Video URL is at: response.data.contents[0].videos[0].url
            const contentItem = response.data.contents[0];

            if (!contentItem || !contentItem.videos || !Array.isArray(contentItem.videos) || contentItem.videos.length === 0) {
                console.error('No videos found in response');
                console.error('Contents:', response.data.contents);
                throw new Error('No videos found in Instagram API response');
            }

            // Get the first video (usually highest quality)
            downloadUrl = contentItem.videos[0].url;
            console.log('Found video URL:', downloadUrl);
        }

        console.log('Extracted download URL:', downloadUrl);

        const fileName = `${Date.now()}_${metadata.platform}_video.mp4`;
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;

        console.log('Starting download to:', fileUri);

        // Download the video with progress tracking
        const downloadResumable = FileSystem.createDownloadResumable(
            downloadUrl!,
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
            throw new Error(`API Error: ${error.response?.data?.msg || error.message}`);
        }
        throw new Error(error instanceof Error ? error.message : 'Failed to download video. Please try again.');
    }
};
