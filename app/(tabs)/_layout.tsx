import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
import '../../global.css';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#6366f1',
                tabBarInactiveTintColor: '#9ca3af',
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 1,
                    borderTopColor: '#e5e7eb',
                    paddingBottom: 20, // Increased to avoid Android navigation buttons
                    paddingTop: 8,
                    height: 100, // Increased height to accommodate padding
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="downloads"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <Feather name="download" size={28} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
