import React from 'react';
import { Text, View } from 'react-native';
import { DownloadProgress as DownloadProgressType } from '../types';

interface DownloadProgressProps {
    progress: DownloadProgressType | null;
    status: 'idle' | 'downloading' | 'completed' | 'error';
    errorMessage?: string;
}

export const DownloadProgress: React.FC<DownloadProgressProps> = ({
    progress,
    status,
    errorMessage
}) => {
    if (status === 'idle') {
        return null;
    }

    const getStatusColor = () => {
        switch (status) {
            case 'downloading':
                return 'bg-primary-600';
            case 'completed':
                return 'bg-green-600';
            case 'error':
                return 'bg-red-600';
            default:
                return 'bg-gray-400';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'downloading':
                return 'Downloading...';
            case 'completed':
                return 'Download completed!';
            case 'error':
                return errorMessage || 'Download failed';
            default:
                return '';
        }
    };

    const percentage = progress?.percentage || 0;

    return (
        <View className="mx-6 my-4 bg-white rounded-xl shadow-md p-4">
            <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-700 font-semibold">{getStatusText()}</Text>
                {status === 'downloading' && (
                    <Text className="text-primary-600 font-bold">{Math.round(percentage)}%</Text>
                )}
            </View>

            {status === 'downloading' && (
                <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <View
                        className={`h-full ${getStatusColor()} transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                    />
                </View>
            )}

            {status === 'completed' && (
                <View className="mt-2">
                    <Text className="text-green-600 text-sm">✓ Video saved to your gallery</Text>
                </View>
            )}

            {status === 'error' && (
                <View className="mt-2">
                    <Text className="text-red-600 text-sm">✗ {errorMessage}</Text>
                </View>
            )}
        </View>
    );
};
