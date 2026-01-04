import { LinearGradient } from 'expo-linear-gradient';
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

    const percentage = progress?.percentage || 0;

    const renderProgressBar = () => {
        if (status === 'error') {
            return (
                <View className="h-2 bg-neutral-100 rounded-full overflow-hidden mt-2">
                    <View className="h-full bg-error-500 w-full" />
                </View>
            );
        }

        return (
            <View className="h-2 bg-neutral-100 rounded-full overflow-hidden mt-2">
                {status === 'downloading' ? (
                    <LinearGradient
                        colors={['#6366f1', '#a855f7']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ width: `${percentage}%`, height: '100%' }}
                    />
                ) : (
                    <View className={`h-full w-full ${status === 'completed' ? 'bg-success-500' : 'bg-neutral-300'}`} />
                )}

            </View>
        );
    };

    return (
        <View className="mx-6 mb-4 bg-white rounded-2xl shadow-sm border border-neutral-100 p-4">
            <View className="flex-row items-center justify-between">
                <Text className="text-neutral-900 font-semibold text-sm">
                    {status === 'downloading' ? 'Downloading...' :
                        status === 'completed' ? 'Download Complete!' :
                            status === 'error' ? 'Download Failed' : ''}
                </Text>
                {status === 'downloading' && (
                    <Text className="text-primary-600 font-bold text-sm">{Math.round(percentage)}%</Text>
                )}
            </View>

            {renderProgressBar()}

            {status === 'error' && (
                <Text className="text-error-500 text-xs mt-2">{errorMessage}</Text>
            )}

            {status === 'completed' && (
                <Text className="text-success-600 text-xs mt-2">✓ Saved to gallery</Text>
            )}
        </View>
    );
};
