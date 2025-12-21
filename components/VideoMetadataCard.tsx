import React from 'react';
import { Image, Text, View } from 'react-native';
import { VideoMetadata } from '../types';

interface VideoMetadataCardProps {
    metadata: VideoMetadata;
}

export const VideoMetadataCard: React.FC<VideoMetadataCardProps> = ({ metadata }) => {
    return (
        <View className="mx-6 my-4 bg-white rounded-2xl shadow-lg overflow-hidden">
            {metadata.thumbnail ? (
                <Image
                    source={{ uri: metadata.thumbnail }}
                    className="w-full h-48"
                    resizeMode="cover"
                />
            ) : (
                <View className="w-full h-48 bg-gray-200 items-center justify-center">
                    <Text className="text-gray-400">No thumbnail available</Text>
                </View>
            )}

            <View className="p-4">
                <Text className="text-lg font-bold text-gray-800 mb-2">
                    {metadata.title}
                </Text>

                <View className="flex-row items-center">
                    <View className="bg-primary-100 px-3 py-1 rounded-full mr-2">
                        <Text className="text-primary-700 text-xs font-semibold uppercase">
                            {metadata.platform}
                        </Text>
                    </View>
                    {metadata.author && (
                        <Text className="text-gray-600 text-sm">by {metadata.author}</Text>
                    )}
                </View>
            </View>
        </View>
    );
};
