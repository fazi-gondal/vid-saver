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
            className="bg-white rounded-2xl shadow-sm border border-neutral-100 mb-3 mx-4 overflow-hidden"
        >
            <View className="flex-row">
                {video.metadata.thumbnail ? (
                    <Image
                        source={{ uri: video.metadata.thumbnail }}
                        className="w-28 h-28"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="w-28 h-28 bg-neutral-100 items-center justify-center">
                        <Feather name="video" size={24} color="#9ca3af" />
                    </View>
                )}

                <View className="flex-1 p-3 justify-between">
                    <View>
                        <View className="flex-row items-center mb-1">
                            <View className={`px-2 py-0.5 rounded-md ${video.metadata.platform === 'instagram' ? 'bg-secondary-50' : 'bg-primary-50'} self-start`}>
                                <Text className={`text-[10px] font-bold uppercase ${video.metadata.platform === 'instagram' ? 'text-secondary-600' : 'text-primary-600'}`}>
                                    {video.metadata.platform}
                                </Text>
                            </View>
                        </View>

                        <Text className="text-neutral-900 font-semibold text-sm leading-5" numberOfLines={2}>
                            {video.metadata.title}
                        </Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                        <Text className="text-neutral-400 text-xs">
                            {formatDate(video.downloadedAt)}
                        </Text>
                        <Text className="text-neutral-400 text-xs bg-neutral-50 px-2 py-0.5 rounded text-center overflow-hidden">
                            {formatFileSize(video.fileSize)}
                        </Text>
                    </View>
                </View>

                {onDelete && (
                    <TouchableOpacity
                        onPress={onDelete}
                        className="p-3 justify-center items-center border-l border-neutral-50"
                    >
                        <Feather name="trash-2" size={18} color="#ef4444" />
                    </TouchableOpacity>
                )}
            </View>
        </Container>
    );
};
