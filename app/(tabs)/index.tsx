import Feather from '@expo/vector-icons/Feather';
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DownloadProgress } from '../../components/DownloadProgress';
import { Header } from '../../components/Header';
import { VideoInput } from '../../components/VideoInput';
import { VideoMetadataCard } from '../../components/VideoMetadataCard';
import { saveVideo } from '../../services/storage';
import { downloadVideo, fetchVideoMetadata } from '../../services/videoDownloader';
import { DownloadProgress as DownloadProgressType, VideoMetadata } from '../../types';
import { isValidVideoUrl } from '../../utils/urlValidator';

export default function HomeScreen() {
    const [videoUrl, setVideoUrl] = useState('');
    const [isValidUrl, setIsValidUrl] = useState(false);
    const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
    const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState<DownloadProgressType | null>(null);
    const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'completed' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle deep linking - when sharing from Instagram/TikTok
    useEffect(() => {
        // Handle initial URL when app is opened via share
        const handleInitialUrl = async () => {
            const url = await Linking.getInitialURL();
            if (url) {
                processSharedUrl(url);
            }
        };

        handleInitialUrl();

        // Listen for URL events while app is running
        const subscription = Linking.addEventListener('url', ({ url }) => {
            processSharedUrl(url);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    // Process shared URL and auto-download
    const processSharedUrl = async (incomingUrl: string) => {
        // Extract actual video URL from the shared text
        // Instagram/TikTok shares as text with URLs in it
        let extractedUrl = incomingUrl;

        // Check if it's a valid video URL
        if (isValidVideoUrl(extractedUrl)) {
            setVideoUrl(extractedUrl);
            setIsValidUrl(true);
            await loadMetadata(extractedUrl);
        }
    };

    const handleUrlChange = async (url: string, isValid: boolean) => {
        setVideoUrl(url);
        setIsValidUrl(isValid);
        setMetadata(null);
        setDownloadStatus('idle');

        if (isValid) {
            await loadMetadata(url);
        }
    };

    const loadMetadata = async (url: string) => {
        setIsLoadingMetadata(true);
        try {
            const videoMetadata = await fetchVideoMetadata(url);
            setMetadata(videoMetadata);

            // Wait 0.5 seconds before auto-starting download
            await new Promise(resolve => setTimeout(resolve, 500));

            // Auto-start download after delay
            await handleDownload(url, videoMetadata);
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
            setDownloadStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Download failed');
            // Keep error visible longer so user can retry
            // Don't auto-clear - user can retry or paste new URL
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'left', 'right']}>
            <Header />

            <ScrollView className="flex-1">
                <VideoInput onUrlChange={handleUrlChange} initialUrl={videoUrl} />

                {isLoadingMetadata && (
                    <View className="mx-6 my-4 items-center">
                        <Text className="text-gray-600">Loading video information...</Text>
                    </View>
                )}

                {metadata && !isLoadingMetadata && (
                    <>
                        <VideoMetadataCard metadata={metadata} />

                        {downloadStatus === 'error' && (
                            <TouchableOpacity
                                onPress={() => handleDownload()}
                                className="mx-6 bg-primary-600 rounded-xl py-4 flex-row items-center justify-center shadow-lg mt-4"
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
