import * as FileSystem from 'expo-file-system/legacy';
import * as MediaLibrary from 'expo-media-library';
import * as SecureStore from 'expo-secure-store';
import { DownloadedVideo, VideoMetadata } from '../types';

const STORAGE_KEY = 'downloaded_videos';

// Save video to media library and store metadata
export const saveVideo = async (
    localUri: string,
    metadata: VideoMetadata
): Promise<DownloadedVideo> => {
    try {
        // Check if we have permission (should already be granted from app initialization)
        const { status } = await MediaLibrary.getPermissionsAsync();
        if (status !== 'granted') {
            const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();
            if (newStatus !== 'granted') {
                throw new Error('Media library permission denied');
            }
        }

        // 1. Create the asset in the default library (Camera Roll/Videos)
        const asset = await MediaLibrary.createAssetAsync(localUri);

        // NOTE: We do NOT create a custom album anymore as per user request.
        // video is saved to default gallery.

        // Fetch full asset info to get the file:// URI (more reliable for playback)
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
        const finalUri = assetInfo.localUri || asset.uri;

        // Get file info
        const fileInfo = await FileSystem.getInfoAsync(localUri);
        const fileSize = fileInfo.exists && 'size' in fileInfo ? fileInfo.size : 0;

        // Create downloaded video object
        const downloadedVideo: DownloadedVideo = {
            id: asset.id,
            metadata,
            localUri: finalUri,
            downloadedAt: Date.now(),
            fileSize,
        };

        // Clean up the temporary file to avoid double storage
        await FileSystem.deleteAsync(localUri, { idempotent: true });

        // Save metadata to secure store
        await addToDownloadedList(downloadedVideo);

        return downloadedVideo;
    } catch (error) {
        console.error('Error saving video:', error);
        throw new Error('Failed to save video');
    }
};

// Get list of downloaded videos from secure store
export const getDownloadedVideos = async (): Promise<DownloadedVideo[]> => {
    try {
        const storedData = await SecureStore.getItemAsync(STORAGE_KEY);
        if (!storedData) {
            return [];
        }
        return JSON.parse(storedData);
    } catch (error) {
        console.error('Error retrieving downloaded videos:', error);
        return [];
    }
};

// Add video to downloaded list
const addToDownloadedList = async (video: DownloadedVideo): Promise<void> => {
    try {
        const currentList = await getDownloadedVideos();
        const updatedList = [video, ...currentList];
        await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (error) {
        console.error('Error adding to downloaded list:', error);
        throw error;
    }
};

// Delete video from media library and metadata
export const deleteVideo = async (videoId: string): Promise<void> => {
    try {
        // Delete from media library
        // This triggers the native "Allow app to delete?" dialog on Android 10+
        await MediaLibrary.deleteAssetsAsync([videoId]);

        // Remove from metadata list ONLY if delete succeeded
        const currentList = await getDownloadedVideos();
        const updatedList = currentList.filter(v => v.id !== videoId);
        await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (error) {
        console.error('Error deleting video:', error);
        // If user denies or cancels, we throw. 
        // We do NOT remove it from the list, so it stays in the app.
        throw error;
    }
};

// Format file size for display
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
