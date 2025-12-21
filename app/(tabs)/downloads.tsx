import Feather from '@expo/vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { VideoListItem } from '../../components/VideoListItem';
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
        Alert.alert(
            'Delete Video',
            'Are you sure you want to delete this video?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteVideo(videoId);
                            await loadVideos();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete video');
                        }
                    },
                },
            ]
        );
    };

    const renderEmptyState = () => (
        <View className="flex-1 items-center justify-center px-6 py-20">
            <Feather name="download" size={64} color="#d1d5db" />
            <Text className="text-gray-500 text-lg font-semibold mt-4">No downloads yet</Text>
            <Text className="text-gray-400 text-center mt-2">
                Videos you download will appear here
            </Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'left', 'right']}>
            <Header />

            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <Text className="text-gray-600">Loading...</Text>
                </View>
            ) : (
                <FlatList
                    data={videos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <VideoListItem
                            video={item}
                            onDelete={() => handleDelete(item.id)}
                        />
                    )}
                    contentContainerStyle={{ paddingVertical: 16 }}
                    ListEmptyComponent={renderEmptyState}
                />
            )}
        </SafeAreaView>
    );
}
