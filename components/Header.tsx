import React from 'react';
import { Text, View } from 'react-native';

export const Header = () => {
    return (
        <View className="bg-primary-600 px-2 pt-2 pb-2">
            <Text className="text-white text-2xl font-bold">Vid-Saver</Text>
            <Text className="text-white/90 text-base mt-1">Download videos from Instagram & TikTok</Text>
        </View>
    );
};
