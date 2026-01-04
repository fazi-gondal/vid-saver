import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import '../../global.css';

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false, // Clean design: Icons only
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 5,
                    backgroundColor: 'transparent',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    height: 55 + insets.bottom, // Reduced height for cleaner look
                    borderTopWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: -4, // Shadow upwards
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    paddingTop: 5, // Minimal padding to center vertically
                    paddingBottom: insets.bottom, // Push icons up from home indicator
                },
                tabBarBackground: () => (
                    <LinearGradient
                        colors={['#6366f1', '#8b5cf6', '#ec4899']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            flex: 1,
                            borderTopLeftRadius: 25,
                            borderTopRightRadius: 25,
                            // No bottom radius
                        }}
                    />
                ),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <View className={`items-center justify-center w-12 h-12 ${focused ? 'bg-white/20 rounded-full' : ''}`}>
                            <Feather name="home" size={28} color={color} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="downloads"
                options={{
                    title: 'Downloads',
                    tabBarIcon: ({ color, focused }) => (
                        <View className={`items-center justify-center w-12 h-12 ${focused ? 'bg-white/20 rounded-full' : ''}`}>
                            <Feather name="download" size={28} color={color} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
