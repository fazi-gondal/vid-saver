import Feather from '@expo/vector-icons/Feather';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface VideoPlayerModalProps {
    visible: boolean;
    videoUri: string | null;
    onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ visible, videoUri, onClose }) => {
    const insets = useSafeAreaInsets();

    // Initialize video player
    const player = useVideoPlayer(videoUri, (player) => {
        player.loop = true;
        if (visible) {
            player.play();
        }
    });

    // Auto-play/pause based on visibility
    useEffect(() => {
        if (visible && videoUri) {
            player.play();
        } else {
            player.pause();
        }
    }, [visible, videoUri, player]);

    if (!visible || !videoUri) return null;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View
                className="flex-1 bg-black/95 relative justify-center items-center"
                style={{
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right
                }}
            >
                {/* Modern Close Button with Blur Effect substitute (using semi-transparent bg) */}
                <TouchableOpacity
                    onPress={onClose}
                    style={{ top: insets.top + 20, right: 20, zIndex: 50 }}
                    className="absolute bg-neutral-900/50 p-2 rounded-full border border-white/10"
                >
                    <Feather name="x" size={24} color="white" />
                </TouchableOpacity>

                {/* Video Player Container */}
                <View className="w-full h-full justify-center">
                    <VideoView
                        style={{ width: '100%', height: '100%' }}
                        player={player}
                        allowsFullscreen
                        allowsPictureInPicture
                        contentFit="contain"
                    />
                </View>
            </View>
        </Modal>
    );
};
