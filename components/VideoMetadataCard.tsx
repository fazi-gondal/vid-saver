import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { VideoMetadata } from '../types';

interface VideoMetadataCardProps {
    metadata: VideoMetadata;
}

export const VideoMetadataCard: React.FC<VideoMetadataCardProps> = ({ metadata }) => {
    return (
        <View className="mx-6 mb-4 bg-white rounded-3xl shadow-md overflow-hidden border border-neutral-100">
            {metadata.thumbnail ? (
                <Image
                    source={{ uri: `https://fastapi-u8bm.onrender.com/api/thumbnail?url=${encodeURIComponent(metadata.thumbnail)}` }}
                    className="w-full h-48"
                    resizeMode="cover"
                />
            ) : (
                <View className="w-full h-48 bg-neutral-100 items-center justify-center">
                    <Feather name="image" size={32} color="#9ca3af" />
                    <Text className="text-neutral-400 mt-2">No thumbnail</Text>
                </View>
            )}

            <View className="p-4">
                <View className="flex-row items-center mb-2">
                    <View className={`px-2 py-1 rounded-md ${metadata.platform === 'instagram' ? 'bg-secondary-50' : 'bg-primary-50'}`}>
                        <Text className={`text-xs font-bold uppercase ${metadata.platform === 'instagram' ? 'text-secondary-600' : 'text-primary-600'}`}>
                            {metadata.platform}
                        </Text>
                    </View>
                </View>

                <Text className="text-lg font-bold text-neutral-900 mb-2 leading-6">
                    {metadata.title}
                </Text>

                {metadata.author && (
                    <View className="flex-row items-center mt-1">
                        <View className="w-6 h-6 rounded-full bg-neutral-100 items-center justify-center mr-2">
                            <Feather name="user" size={14} color="#6b7280" />
                        </View>
                        <Text className="text-neutral-600 text-sm font-medium">{metadata.author}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};
