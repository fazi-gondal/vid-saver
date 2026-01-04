import * as FileSystem from 'expo-file-system';
// @ts-ignore
import { StorageAccessFramework } from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import { DownloadedVideo, VideoMetadata } from '../types';

const STORAGE_KEY = 'downloaded_videos';
const FOLDER_URI_KEY = 'saf_folder_uri';

// Ensure we have permission to a specific folder
export const ensureFolderPermission = async (): Promise<string | null> => {
    try {
        // 1. Check if we already have a saved URI
        const savedUri = await SecureStore.getItemAsync(FOLDER_URI_KEY);

        if (savedUri) {
            return savedUri;
        }

        // 2. If no URI, request permission
        // We ask the user to select a "Root" folder (like Documents)
        const permission = await StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permission.granted) {
            const parentUri = permission.directoryUri;

            // 3. Attempt to create "VidSaver" subfolder
            // This is "Auto Create" logic
            let finalUri = parentUri; // Default to chosen folder if logic fails

            try {
                // Try to create the folder. Returns URI of new folder.
                finalUri = await StorageAccessFramework.makeDirectoryAsync(parentUri, 'VidSaver');
            } catch (e) {
                // If it fails, it likely exists. We need to find its URI.
                console.log('VidSaver folder creation failed (likely exists), searching for it...');
                try {
                    const files = await StorageAccessFramework.readDirectoryAsync(parentUri);
                    // Find a folder named "VidSaver" (need to decode URI to check name)
                    // Content URIs are opaque, but usually end with ...%2FVidSaver
                    // A safer way is checking if we can write to it, but simple string match is efficient enough for now
                    const existingFolder = files.find((uri: string) => decodeURIComponent(uri).endsWith('/VidSaver'));
                    if (existingFolder) {
                        finalUri = existingFolder;
                    }
                } catch (searchError) {
                    console.error('Failed to search for existing folder:', searchError);
                    // Fallback to parentUri (just save in the root of selection)
                    finalUri = parentUri;
                }
            }

            await SecureStore.setItemAsync(FOLDER_URI_KEY, finalUri);
            return finalUri;
        }

        return null;
    } catch (error) {
        console.error('Error requesting folder permission:', error);
        return null;
    }
};

// Save video to SAF folder
export const saveVideo = async (
    localUri: string,
    metadata: VideoMetadata
): Promise<DownloadedVideo> => {
    try {
        // 1. Get Folder URI
        let folderUri = await ensureFolderPermission();

        if (!folderUri) {
            throw new Error("PERMISSION_REQUIRED");
        }

        // 2. Read the temp file content
        const videoContent = await FileSystem.readAsStringAsync(localUri, { encoding: 'base64' });

        // 3. Create File in Target Folder
        const mimeType = 'video/mp4';
        // Sanitize title for filename
        const safeTitle = metadata.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
        const filename = `${safeTitle}_${Date.now()}.mp4`;

        const newFileUri = await StorageAccessFramework.createFileAsync(folderUri, filename, mimeType);

        // 4. Write Data
        await FileSystem.writeAsStringAsync(newFileUri, videoContent, { encoding: 'base64' });

        // Get file size
        const fileInfo = await FileSystem.getInfoAsync(localUri);
        const fileSize = fileInfo.exists && 'size' in fileInfo ? fileInfo.size : 0;

        // Cleanup Temp File
        await FileSystem.deleteAsync(localUri, { idempotent: true });

        // Create downloaded video object
        const downloadedVideo: DownloadedVideo = {
            id: newFileUri, // Use SAF URI as ID
            metadata,
            localUri: newFileUri, // This content:// uri works in many players
            downloadedAt: Date.now(),
            fileSize,
        };

        // Save metadata to secure store
        await addToDownloadedList(downloadedVideo);

        return downloadedVideo;
    } catch (error) {
        console.error('Error saving video:', error);
        if (error instanceof Error && error.message === 'PERMISSION_REQUIRED') {
            throw error;
        }
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

// Delete video from SAF and metadata
export const deleteVideo = async (videoId: string): Promise<void> => {
    try {
        // Delete from Storage (SAF)
        // videoId is the content:// uri
        await StorageAccessFramework.deleteAsync(videoId);

        // Remove from metadata list
        const currentList = await getDownloadedVideos();
        const updatedList = currentList.filter(v => v.id !== videoId);
        await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (error) {
        console.error('Error deleting video:', error);
        // Best effort clean up even if file is missing
        const currentList = await getDownloadedVideos();
        const updatedList = currentList.filter(v => v.id !== videoId);
        await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updatedList));
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
