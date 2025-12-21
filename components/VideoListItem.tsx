import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { formatFileSize } from '../services/storage';
import { DownloadedVideo } from '../types';

interface VideoListItemProps {
    video: DownloadedVideo;
    onPress?: () => void;
    onDelete?: () => void;
}

export const VideoListItem: React.FC<VideoListItemProps> = ({ video, onPress, onDelete }) => {
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const Container = onPress ? TouchableOpacity : View;

    return (
        <Container
            onPress={onPress}
            className="bg-white rounded-xl shadow-md mb-3 mx-4 overflow-hidden"
        >
            <View className="flex-row">
                {video.metadata.thumbnail ? (
                    <Image
                        source={{ uri: video.metadata.thumbnail }}
                        className="w-28 h-28"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="w-28 h-28 bg-gray-200 items-center justify-center">
                        <Feather name="video" size={32} color="#9ca3af" />
                    </View>
                )}

                <View className="flex-1 p-3 justify-between">
                    <View>
                        <Text className="text-gray-800 font-semibold text-sm" numberOfLines={2}>
                            {video.metadata.title}
                        </Text>
                        <View className="flex-row items-center mt-1">
                            <View className="bg-primary-100 px-2 py-0.5 rounded-full">
                                <Text className="text-primary-700 text-xs font-semibold uppercase">
                                    {video.metadata.platform}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="flex-row items-center justify-between mt-2">
                        <Text className="text-gray-500 text-xs">
                            {formatDate(video.downloadedAt)}
                        </Text>
                        <Text className="text-gray-500 text-xs">
                            {formatFileSize(video.fileSize)}
                        </Text>
                    </View>
                </View>

                {onDelete && (
                    <TouchableOpacity
                        onPress={onDelete}
                        className="p-3 justify-center"
                    >
                        <Feather name="trash-2" size={20} color="#ef4444" />
                    </TouchableOpacity>
                )}
            </View>
        </Container>
    );
};
