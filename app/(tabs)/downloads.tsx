import Feather from '@expo/vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { VideoListItem } from '../../components/VideoListItem';
import { VideoPlayerModal } from '../../components/VideoPlayerModal';
import { deleteVideo, getDownloadedVideos } from '../../services/storage';
import { DownloadedVideo } from '../../types';

export default function DownloadsScreen() {
    const [videos, setVideos] = useState<DownloadedVideo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadVideos = useCallback(async () => {
        setIsLoading(true);
        try {
            const downloadedVideos = await getDownloadedVideos();
            setVideos(downloadedVideos);
        } catch (error) {
            console.error('Error loading videos:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Reload videos whenever the tab is focused
    useFocusEffect(
        useCallback(() => {
            loadVideos();
        }, [loadVideos])
    );

    const handleDelete = async (videoId: string) => {
        try {
            await deleteVideo(videoId);
            await loadVideos();
        } catch (error) {
            // User likely denied permission or cancelled system dialog
            console.log('Delete cancelled or failed', error);
        }
    };

    const renderEmptyState = () => (
        <View className="flex-1 items-center justify-center px-6 py-20">
            <View className="w-24 h-24 bg-neutral-100 rounded-full items-center justify-center mb-6">
                <Feather name="download" size={40} color="#9ca3af" />
            </View>
            <Text className="text-neutral-900 text-xl font-bold mt-4">No downloads yet</Text>
            <Text className="text-neutral-500 text-center mt-2 text-base">
                Paste a link on the home screen to start downloading videos
            </Text>
        </View>
    );

    const insets = useSafeAreaInsets();
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const handleVideoPress = (videoUri: string) => {
        // Ensure uri is valid for expo-video
        // For local files, it usually starts with file://, ensure we pass that correctly
        setSelectedVideo(videoUri);
    };

    return (
        <SafeAreaView className="flex-1 bg-neutral-50" edges={['left', 'right']}>
            <StatusBar style="light" />
            <View className="shadow-md bg-transparent z-10">
                <LinearGradient
                    colors={['#6366f1', '#a855f7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="px-6 rounded-b-[32px] overflow-hidden"
                    style={{ paddingTop: insets.top + 10, paddingBottom: 24 }}
                >
                    <Text className="text-3xl font-bold text-white">Downloads</Text>
                    <Text className="text-primary-50 text-sm mt-1">
                        {videos.length} video{videos.length !== 1 ? 's' : ''} saved
                    </Text>
                </LinearGradient>
            </View>

            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <Text className="text-neutral-500">Loading...</Text>
                </View>
            ) : (
                <FlatList
                    data={videos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <VideoListItem
                            video={item}
                            onPress={() => handleVideoPress(item.localUri)}
                            onDelete={() => handleDelete(item.id)}
                        />
                    )}
                    contentContainerStyle={{ paddingVertical: 24 }}
                    ListEmptyComponent={renderEmptyState}
                />
            )}

            <VideoPlayerModal
                visible={!!selectedVideo}
                videoUri={selectedVideo}
                onClose={() => setSelectedVideo(null)}
            />
        </SafeAreaView>
    );
}
