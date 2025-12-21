import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { isValidVideoUrl } from '../utils/urlValidator';

interface VideoInputProps {
    onUrlChange: (url: string, isValid: boolean) => void;
    initialUrl?: string;
}

export const VideoInput: React.FC<VideoInputProps> = ({ onUrlChange, initialUrl = '' }) => {
    const [url, setUrl] = useState(initialUrl);
    const [error, setError] = useState('');

    useEffect(() => {
        // Auto-paste from clipboard on mount
        checkClipboard();
    }, []);

    const checkClipboard = async () => {
        try {
            const clipboardContent = await Clipboard.getStringAsync();
            if (clipboardContent && isValidVideoUrl(clipboardContent)) {
                setUrl(clipboardContent);
                setError('');
                onUrlChange(clipboardContent, true);
            }
        } catch (error) {
            console.error('Error reading clipboard:', error);
        }
    };

    const handleUrlChange = (text: string) => {
        setUrl(text);
        const isValid = isValidVideoUrl(text);

        if (text && !isValid) {
            setError('Please enter a valid Instagram or TikTok URL');
        } else {
            setError('');
        }

        onUrlChange(text, isValid);
    };

    const handlePaste = async () => {
        try {
            const clipboardContent = await Clipboard.getStringAsync();
            if (clipboardContent) {
                handleUrlChange(clipboardContent);
            }
        } catch (error) {
            console.error('Error pasting from clipboard:', error);
        }
    };

    return (
        <View className="px-6 py-4">
            <Text className="text-gray-700 font-semibold mb-2">Video URL</Text>
            <View className="flex-row items-center">
                <TextInput
                    className="flex-1 bg-white border border-gray-300 rounded-l-lg px-4 py-3 text-gray-800"
                    placeholder="Paste Instagram or TikTok link..."
                    placeholderTextColor="#9ca3af"
                    value={url}
                    onChangeText={handleUrlChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TouchableOpacity
                    onPress={handlePaste}
                    className="bg-primary-600 px-4 py-3 rounded-r-lg"
                >
                    <Text className="text-white font-semibold">Paste</Text>
                </TouchableOpacity>
            </View>
            {error ? (
                <Text className="text-red-500 text-sm mt-2">{error}</Text>
            ) : null}
        </View>
    );
};
