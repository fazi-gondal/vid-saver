import Feather from '@expo/vector-icons/Feather';
import { useShareIntent } from 'expo-share-intent';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DownloadProgress } from '../../components/DownloadProgress';
import { Header } from '../../components/Header';
import { VideoInput } from '../../components/VideoInput';
import { VideoMetadataCard } from '../../components/VideoMetadataCard';
import { ensureFolderPermission, saveVideo } from '../../services/storage';
import { downloadVideo, fetchVideoMetadata } from '../../services/videoDownloader';
import { DownloadProgress as DownloadProgressType, VideoMetadata } from '../../types';
import { extractUrlFromText, isValidVideoUrl } from '../../utils/urlValidator';

export default function HomeScreen() {
    const [videoUrl, setVideoUrl] = useState('');
    const [isValidUrl, setIsValidUrl] = useState(false);
    const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
    const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState<DownloadProgressType | null>(null);
    const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'completed' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle Share Intent
    const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent();

    useEffect(() => {
        if (hasShareIntent) {
            // Try to find a value from various possible properties
            // @ts-ignore
            const rawValue = shareIntent.value || shareIntent.url || shareIntent.text;

            if (rawValue) {
                const extractedUrl = extractUrlFromText(rawValue);
                if (extractedUrl && isValidVideoUrl(extractedUrl)) {
                    setVideoUrl(extractedUrl);
                    setIsValidUrl(true);
                    loadMetadata(extractedUrl, true); // <--- Enable Auto-Download
                    resetShareIntent();
                }
            }
        }
    }, [hasShareIntent, shareIntent, resetShareIntent]);

    // Cleanup previous Linking listener if needed, or keep for generic deep links
    // For this feature, the hook handles the heavy lifting of "Shared Text" from Android/iOS.

    const handleUrlChange = async (inputText: string, isValid: boolean) => {
        // Try to extract a cleaner URL if the direct input is invalid but might contain one
        // This handles cases where user pastes "Look at this https://..."
        let effectiveUrl = inputText;
        let effectiveIsValid = isValid;

        if (!isValid && inputText.length > 5) {
            const extracted = extractUrlFromText(inputText);
            if (extracted && isValidVideoUrl(extracted)) {
                effectiveUrl = extracted;
                effectiveIsValid = true;
            }
        }

        setVideoUrl(effectiveUrl);
        setIsValidUrl(effectiveIsValid);
        setMetadata(null);
        setDownloadStatus('idle');

        if (effectiveIsValid) {
            // Enable auto-download for manual input too
            await loadMetadata(effectiveUrl, true);
        }
    };

    const loadMetadata = async (url: string, autoDownload: boolean = false) => {
        setIsLoadingMetadata(true);
        setDownloadStatus('idle');
        setErrorMessage('');
        try {
            const videoMetadata = await fetchVideoMetadata(url);
            setMetadata(videoMetadata);

            if (autoDownload) {
                // Small delay to ensure state updates or simply proceed
                // Since we have the metadata object here, we can pass it directly to handleDownload
                // avoiding async state issues.
                setTimeout(() => {
                    handleDownload(url, videoMetadata);
                }, 500);
            }
        } catch (error) {
            Alert.alert('Error', error instanceof Error ? error.message : 'Failed to load video information');
        } finally {
            setIsLoadingMetadata(false);
        }
    };

    const handleDownload = async (urlParam?: string, metadataParam?: VideoMetadata) => {
        const downloadUrl = urlParam || videoUrl;
        const downloadMetadata = metadataParam || metadata;

        if (!downloadUrl || !downloadMetadata) return;

        setDownloadStatus('downloading');
        setDownloadProgress({ totalBytes: 0, downloadedBytes: 0, percentage: 0 });

        try {
            const localUri = await downloadVideo(downloadUrl, downloadMetadata, (progress) => {
                setDownloadProgress(progress);
            });

            await saveVideo(localUri, downloadMetadata);

            setDownloadStatus('completed');
            setTimeout(() => {
                setDownloadStatus('idle');
                setMetadata(null);
                setVideoUrl('');
            }, 3000);
        } catch (error) {
            // Handle SAF Permission Requirement (Production Flow)
            if (error instanceof Error && error.message === 'PERMISSION_REQUIRED') {
                setDownloadStatus('idle'); // Status: Idle (waiting for user)
                Alert.alert(
                    "Setup Storage",
                    "Please select your **Downloads** folder.\n\nWe will automatically create a 'VidSaver' folder inside it for your videos! 📂",
                    [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "Select Downloads",
                            onPress: async () => {
                                const uri = await ensureFolderPermission();
                                if (uri) {
                                    // Permission granted, retry download automatically
                                    handleDownload(downloadUrl, downloadMetadata);
                                } else {
                                    setErrorMessage("Folder selection cancelled");
                                    setDownloadStatus('error');
                                }
                            }
                        }
                    ]
                );
                return;
            }

            setDownloadStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Download failed');
            // Keep error visible longer so user can retry
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-neutral-50" edges={['left', 'right']}>
            <StatusBar style="light" />
            <Header />

            <ScrollView className="flex-1">
                <VideoInput onUrlChange={handleUrlChange} initialUrl={videoUrl} />

                {isLoadingMetadata && (
                    <View className="mx-6 my-4 items-center">
                        <Text className="text-neutral-500">Loading video information...</Text>
                    </View>
                )}

                {metadata && !isLoadingMetadata && (
                    <>
                        <VideoMetadataCard metadata={metadata} />

                        {downloadStatus === 'idle' && (
                            <TouchableOpacity
                                onPress={() => handleDownload()}
                                className="mx-6 bg-primary-600 rounded-2xl py-4 flex-row items-center justify-center shadow-md active:bg-primary-700"
                            >
                                <Feather name="download" size={20} color="white" />
                                <Text className="text-white font-bold text-lg ml-2">Download Video</Text>
                            </TouchableOpacity>
                        )}

                        {downloadStatus === 'error' && (
                            <TouchableOpacity
                                onPress={() => handleDownload()}
                                className="mx-6 bg-error-600 rounded-2xl py-4 flex-row items-center justify-center shadow-md active:bg-error-700"
                            >
                                <Feather name="refresh-cw" size={20} color="white" />
                                <Text className="text-white font-bold text-lg ml-2">Retry Download</Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}

                <DownloadProgress
                    progress={downloadProgress}
                    status={downloadStatus}
                    errorMessage={errorMessage}
                />


            </ScrollView>
        </SafeAreaView>
    );
}
