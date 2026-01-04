import Feather from '@expo/vector-icons/Feather';
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

    useEffect(() => {
        if (initialUrl !== url) {
            setUrl(initialUrl);
        }
    }, [initialUrl]);

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
            setError('Please enter a valid video URL');
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
            <View className="space-y-2">
                <Text className="text-neutral-700 text-sm font-medium ml-1">Video URL</Text>
                <View className="flex-row items-center bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2 focus:border-primary-500">
                    <TouchableOpacity
                        onPress={handlePaste}
                        className="bg-primary-100 px-3 py-1.5 rounded-lg active:bg-primary-200 mr-3"
                    >
                        <Text className="text-primary-700 font-semibold text-xs">Paste</Text>
                    </TouchableOpacity>
                    <TextInput
                        className="flex-1 text-base text-neutral-900 py-2"
                        placeholder="Paste URL"
                        placeholderTextColor="#9ca3af"
                        value={url}
                        onChangeText={handleUrlChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {url.length > 0 && (
                        <TouchableOpacity
                            onPress={() => handleUrlChange('')}
                            className="bg-neutral-200 p-1.5 rounded-full"
                        >
                            <Feather name="x" size={14} color="#4b5563" />
                        </TouchableOpacity>
                    )}
                </View>
                {error ? (
                    <View className="flex-row items-center mt-1 ml-1">
                        <Feather name="alert-circle" size={14} color="#ef4444" />
                        <Text className="text-error-500 text-xs ml-1">{error}</Text>
                    </View>
                ) : null}
            </View>
        </View>
    );
};
