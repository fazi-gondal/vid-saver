import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Header = () => {
    const insets = useSafeAreaInsets();

    return (
        <View className="shadow-lg bg-transparent z-10">
            <LinearGradient
                colors={['#6366f1', '#a855f7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="px-6 rounded-b-[25px] overflow-hidden"
                style={{ paddingTop: insets.top + 10, paddingBottom: 24 }}
            >
                <Text className="text-white text-3xl font-bold">Vid Saver</Text>
                <Text className="text-primary-50 text-sm mt-1">
                    All in one Social Media Downloader
                </Text>
            </LinearGradient>
        </View>
    );
};
