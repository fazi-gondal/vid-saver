import * as MediaLibrary from 'expo-media-library';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() {
  // Request media library permissions on app startup
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const { status } = await MediaLibrary.getPermissionsAsync();
        if (status !== 'granted') {
          await MediaLibrary.requestPermissionsAsync();
        }
      } catch (error) {
        console.error('Error requesting permissions:', error);
      }
    };

    requestPermissions();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#6366f1" style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}
