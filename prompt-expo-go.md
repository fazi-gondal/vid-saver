# Complete Prompt for Vid-Saver App with Expo Go

Build a professional Instagram and TikTok video downloader app using **React Native Expo Go** with modern UI components and premium design.

## App Overview

**Name:** Vid-Saver\
**Type:** React Native Expo App (Expo Go Compatible)\
**Purpose:** Download HD videos from Instagram and TikTok without watermarks\
**UI Library:** React Native Paper / NativeBase (Expo Go Compatible)\
**Styling:** Utility-first with custom styling

## Technology Stack

### Framework & Build

* **Expo SDK:** ~54.0.0 or latest compatible with Expo Go
* **React:** 19.1.0 or compatible
* **React Native:** 0.81.5 or compatible
* **Build Type:** **Expo Go Compatible** (No custom native modules)
* **Navigation:** Expo Router (~6.0.17)
* **TypeScript:** ~5.9.2

### UI & Styling

* **HeroUI-Native:** Latest version (Modern React Native UI library)
* **Tailwind CSS:** Built-in with HeroUI-Native
* **React Aria:** For accessibility (built-in with HeroUI-Native)
* **Design Philosophy:** Modern, clean, accessible, premium UI
* **Expo Go Compatible:** HeroUI-Native works with Expo Go

**Installation:**

```bash
npm install @heroui/native
npm install react-native-svg
npm install react-native-reanimated
npm install react-native-gesture-handler
npm install react-native-screens
npm install react-native-safe-area-context
```

**Important:** Add the Reanimated plugin to your `babel.config.js`:

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

### Available HeroUI-Native Components

**Form & Input:**

* `Input`, `InputGroup`, `TextField`, `TextArea`
* `SearchField`, `NumberField`, `DateField`, `TimeField`
* `Select`, `ComboBox`, `Checkbox`, `CheckboxGroup`
* `RadioGroup`, `Switch`, `Slider`
* `InputOTP`, `Form`, `Label`, `Description`, `ErrorMessage`

**Layout & Navigation:**

* `Card`, `Surface`, `Tabs`, `Accordion`
* `Modal`, `Tooltip`, `ScrollShadow`

**Feedback & Display:**

* `Button`, `ButtonGroup`, `Link`
* `Alert`, `Spinner`, `Chip`
* `Avatar`, `Badge`
* `Listbox`, `TagGroup`
* `CloseButton`, `Progress`

### Key Expo Packages (Expo Go Compatible)

```json
"expo-router": "~6.0.17",
"expo-file-system": "^19.0.20",
"expo-media-library": "^18.2.1",
"expo-clipboard": "~7.0.0",
"expo-status-bar": "~3.0.9",
"expo-linking": "~8.0.10",
"expo-splash-screen": "~31.0.12",
"expo-constants": "~18.0.11",
"expo-image": "~3.0.11",
"expo-av": "~15.0.1",
"expo-haptics": "~14.0.0"
```

### Navigation & Icons

```json
"@react-navigation/native": "^7.1.8",
"@react-navigation/bottom-tabs": "^7.4.0",
"react-native-safe-area-context": "~5.6.0",
"react-native-screens": "~4.16.0",
"@expo/vector-icons": "^15.0.3"
```

### HTTP Client

```json
"axios": "^1.13.2"
```

## API Configuration

### Instagram Video Download

**API:** RapidAPI - Social Media Video Downloader\
**RapidAPI Link:** [Social Media Video Downloader](https://rapidapi.com/social-api1-instagram/api/social-media-video-downloader)\
**Endpoint:** `https://social-media-video-downloader.p.rapidapi.com/instagram/v3/media/post/details`\
**Method:** GET

**Headers:**

```javascript
{
  'x-rapidapi-key': 'YOUR_API_KEY',
  'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com'
}
```

**Query Parameters:**

* `shortcode` (required): Extracted from Instagram URL using regex pattern `/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/`
* `renderableFormats` (optional): "720p,highres"

**Response Structure:**

```javascript
{
  title: string | caption: string,
  thumbnail_url: string | cover_url: string | picture: string,
  username: string | owner.username: string,
  contents: [{
    videos: [{
      url: string,
      quality: string,
      width: number,
      height: number
    }]
  }]
}
```

### TikTok Video Download

**API:** TikWM API (Free - No Authentication)\
**Website:** [TikWM.com](https://www.tikwm.com/)\
**Endpoint:** `https://www.tikwm.com/api/?url={videoUrl}?hd=1`\
**Method:** GET

**Response Structure:**

```javascript
{
  code: 0,
  msg: string,
  data: {
    title: string,
    cover: string,
    hdplay: string,
    play: string,
    wmplay: string,
    author: {
      nickname: string,
      unique_id: string
    }
  }
}
```

## Design System

### Color Palette (Modern & Vibrant)

**Primary Colors:**

```typescript
const colors = {
  // Primary - Indigo gradient
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',  // Main primary
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  
  // Secondary - Purple accent
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  
  // Success - Emerald
  success: {
    500: '#10b981',
    600: '#059669',
  },
  
  // Error - Rose
  error: {
    500: '#ef4444',
    600: '#dc2626',
  },
  
  // Warning - Amber
  warning: {
    500: '#f59e0b',
    600: '#d97706',
  },
  
  // Neutral - Gray scale
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
}
```

**Theme Configuration:**

```typescript
// app.config.js or theme configuration
export const theme = {
  colors: {
    background: '#f9fafb',
    surface: '#ffffff',
    primary: '#6366f1',
    secondary: '#a855f7',
    accent: '#ec4899',
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      tertiary: '#9ca3af',
    },
    border: '#e5e7eb',
    statusBar: '#6366f1',
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
  }
};
```

### Typography

**Font System:**

```typescript
const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -0.25,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  }
}
```

## App Features & UI Implementation

### 1. Home Screen (Using HeroUI-Native)

**Layout Components:**

* Header with app branding
* Video URL input (HeroUI `SearchField` or `TextField`)
* Metadata card (Custom `VideoCard` using HeroUI `Card`)
* Progress indicator (Custom `DownloadProgress` or HeroUI `Spinner`)
* Action buttons (HeroUI `Button`)

**Component Structure:**

```tsx
import { 
  Card, 
  TextField, 
  Button, 
  Spinner, 
  Avatar,
  Chip,
  Alert,
  Surface
} from '@heroui/native';
import { ScrollView, View, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';

// Home Screen Layout
export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-neutral-50">
      {/* Header */}
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 pt-12 pb-6 rounded-b-3xl"
      >
        <Text className="text-white text-3xl font-bold">Vid-Saver</Text>
        <Text className="text-primary-100 text-sm mt-1">
          Download videos without watermarks
        </Text>
      </LinearGradient>

      <View className="px-6 py-4">
        {/* URL Input */}
        <TextField
          label="Video URL"
          placeholder="Paste Instagram or TikTok URL"
          size="lg"
          radius="lg"
          startContent={<Feather name="link" size={20} color="#6b7280" />}
          endContent={
            clipboardUrl && (
              <Button size="sm" onPress={handlePaste}>
                Paste
              </Button>
            )
          }
          classNames={{
            base: "mb-4",
            input: "text-base",
          }}
        />

        {/* Metadata Card */}
        {metadata && (
          <Card 
            shadow="md"
            radius="xl"
            className="mb-4 overflow-hidden"
          >
            <Card.Body className="p-0">
              {/* Thumbnail */}
              <Image 
                source={{ uri: metadata.thumbnail }}
                className="w-full h-48"
                resizeMode="cover"
              />
              
              <View className="p-4">
                {/* Platform Badge */}
                <Chip
                  color={metadata.platform === 'instagram' ? 'secondary' : 'primary'}
                  variant="flat"
                  size="sm"
                  className="mb-2 self-start"
                >
                  {metadata.platform.toUpperCase()}
                </Chip>

                {/* Video Info */}
                <Text className="text-lg font-semibold text-neutral-900 mb-1">
                  {metadata.title}
                </Text>
                
                <View className="flex-row items-center mt-2">
                  <Avatar
                    size="sm"
                    name={metadata.author}
                    className="mr-2"
                  />
                  <Text className="text-neutral-600 text-sm">
                    {metadata.author}
                  </Text>
                </View>
              </View>
            </Card.Body>
          </Card>
        )}

        {/* Download Progress */}
        {downloading && (
          <Card shadow="sm" className="mb-4">
            <Card.Body>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-medium text-neutral-900">Downloading...</Text>
                <Text className="text-primary-600 font-semibold">
                  {progress.percentage.toFixed(0)}%
                </Text>
              </View>
              
              {/* Custom Progress Bar */}
              <View className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                <View 
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  style={{ width: `${progress.percentage}%` }}
                />
              </View>
              
              <Text className="text-xs text-neutral-500 mt-2">
                {formatFileSize(progress.downloadedBytes)} / {formatFileSize(progress.totalBytes)}
              </Text>
            </Card.Body>
          </Card>
        )}

        {/* Error Alert */}
        {error && (
          <Alert
            color="error"
            variant="flat"
            title="Download Failed"
            description={error}
            icon={<Feather name="alert-circle" size={20} />}
            action={
              <Button size="sm" color="error" onPress={handleRetry}>
                Retry
              </Button>
            }
            className="mb-4"
          />
        )}

        {/* Success Alert */}
        {success && (
          <Alert
            color="success"
            variant="flat"
            title="Download Complete!"
            description="Video saved to your gallery"
            icon={<Feather name="check-circle" size={20} />}
            className="mb-4"
          />
        )}

        {/* Download Button */}
        <Button
          color="primary"
          size="lg"
          radius="lg"
          onPress={handleDownload}
          isLoading={downloading}
          isDisabled={!metadata || downloading}
          className="mt-2"
          startContent={<Feather name="download" size={20} color="#fff" />}
        >
          Download Video
        </Button>
      </View>
    </ScrollView>
  );
}
```

### 2. Downloads Screen

**Layout Components:**

* List of downloaded videos (FlatList with Paper Cards)
* Video items (Paper `Card` based)
* Empty state (Custom with Paper `Surface`)
* Delete confirmation (Paper `Dialog`)
* Video player modal (Paper `Portal` with expo-av)

**Component Structure:**

```tsx
import React, { useState } from 'react';
import {
  Card,
  Button,
  Dialog,
  Portal,
  Avatar,
  Chip,
  Surface,
  IconButton,
  FAB,
} from 'react-native-paper';
import { FlatList, View, Image, StyleSheet, Pressable } from 'react-native';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';

// Downloads Screen
export default function DownloadsScreen() {
  const [playerVisible, setPlayerVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Surface style={styles.header} elevation={0}>
        <Text style={styles.headerTitle}>Downloads</Text>
        <Text style={styles.headerSubtitle}>
          {videos.length} video{videos.length !== 1 ? 's' : ''} saved
        </Text>
      </Surface>

      {videos.length === 0 ? (
        // Empty State
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Feather name="download" size={48} color="#9ca3af" />
          </View>
          <Text style={styles.emptyTitle}>No Downloads Yet</Text>
          <Text style={styles.emptyDescription}>
            Downloaded videos will appear here
          </Text>
        </View>
      ) : (
        // Video List
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <Card
              style={styles.videoCard}
              onPress={() => handlePlayVideo(item)}
            >
              <View style={styles.videoCardContent}>
                {/* Thumbnail */}
                <Image
                  source={{ uri: item.metadata.thumbnail }}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />

                {/* Video Info */}
                <View style={styles.videoInfo}>
                  <Chip
                    mode="flat"
                    style={{
                      backgroundColor:
                        item.metadata.platform === 'instagram'
                          ? '#f3e8ff'
                          : '#eef2ff',
                      marginBottom: 4,
                      alignSelf: 'flex-start',
                    }}
                    textStyle={{
                      color:
                        item.metadata.platform === 'instagram'
                          ? '#9333ea'
                          : '#4f46e5',
                      fontSize: 10,
                      fontWeight: '600',
                    }}
                  >
                    {item.metadata.platform.toUpperCase()}
                  </Chip>

                  <Text
                    style={styles.videoCardTitle}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.metadata.title}
                  </Text>

                  <View style={styles.videoMeta}>
                    <Text style={styles.metaText}>
                      {formatFileSize(item.fileSize)}
                    </Text>
                    <Text style={styles.metaText}>
                      {formatDate(item.downloadedAt)}
                    </Text>
                  </View>
                </View>

                {/* Delete Button */}
                <IconButton
                  icon="delete"
                  iconColor="#ef4444"
                  size={20}
                  onPress={() => handleDeletePrompt(item)}
                />
              </View>
            </Card>
          )}
        />
      )}

      {/* Video Player Modal */}
      <Portal>
        <Dialog
          visible={playerVisible}
          onDismiss={() => setPlayerVisible(false)}
          style={styles.playerDialog}
        >
          <Dialog.Title>Video Player</Dialog.Title>
          <Dialog.Content>
            {currentVideo && (
              <Video
                source={{ uri: currentVideo.localUri }}
                style={styles.videoPlayer}
                useNativeControls
                resizeMode="contain"
                shouldPlay
              />
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setPlayerVisible(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Delete Confirmation Dialog */}
      <Portal>
        <Dialog
          visible={deleteDialogVisible}
          onDismiss={() => setDeleteDialogVisible(false)}
        >
          <Dialog.Title>Delete Video?</Dialog.Title>
          <Dialog.Content>
            <Text>
              This will permanently delete the video from your device.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>
              Cancel
            </Button>
            <Button
              onPress={confirmDelete}
              textColor="#ef4444"
              mode="contained"
              buttonColor="#fee2e2"
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    backgroundColor: '#f3f4f6',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  videoCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  videoCardContent: {
    flexDirection: 'row',
    padding: 0,
  },
  thumbnail: {
    width: 112,
    height: 112,
  },
  videoInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  videoCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  playerDialog: {
    backgroundColor: '#ffffff',
  },
  videoPlayer: {
    width: '100%',
    height: 300,
  },
});
```

### 3. Bottom Tab Navigation (Expo Router)

**Using Expo Router with React Native Paper Integration:**

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 60,
          paddingBottom: 8,
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
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="downloads"
        options={{
          title: 'Downloads',
          tabBarIcon: ({ color, size }) => (
            <Feather name="download" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

## Custom Components

### 1. Custom Progress Card

```tsx
// components/DownloadProgress.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, ProgressBar, Text } from 'react-native-paper';

interface DownloadProgressProps {
  progress: number;
  downloadedBytes: number;
  totalBytes: number;
}

export const DownloadProgress: React.FC<DownloadProgressProps> = ({
  progress,
  downloadedBytes,
  totalBytes,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>
            Downloading...
          </Text>
          <Text variant="titleLarge" style={styles.percentage}>
            {progress.toFixed(0)}%
          </Text>
        </View>

        <ProgressBar
          progress={progress / 100}
          color="#6366f1"
          style={styles.progressBar}
        />

        <View style={styles.footer}>
          <Text variant="bodySmall" style={styles.info}>
            {formatFileSize(downloadedBytes)}
          </Text>
          <Text variant="bodySmall" style={styles.info}>
            {formatFileSize(totalBytes)}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontWeight: '600',
    color: '#111827',
  },
  percentage: {
    fontWeight: '700',
    color: '#6366f1',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  info: {
    color: '#9ca3af',
  },
});
```

### 2. Custom Video Metadata Card

```tsx
// components/VideoMetadataCard.tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card, Avatar, Chip, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { VideoMetadata } from '@/types';

interface VideoMetadataCardProps {
  metadata: VideoMetadata;
}

export const VideoMetadataCard: React.FC<VideoMetadataCardProps> = ({
  metadata,
}) => {
  return (
    <Card style={styles.card} elevation={2}>
      {/* Thumbnail with Gradient Overlay */}
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: metadata.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.gradient}
        />

        {/* Platform Badge */}
        <View style={styles.badgeContainer}>
          <Chip
            mode="outlined"
            style={[
              styles.chip,
              {
                backgroundColor:
                  metadata.platform === 'instagram' ? '#f3e8ff' : '#eef2ff',
              },
            ]}
            textStyle={{
              color: metadata.platform === 'instagram' ? '#9333ea' : '#4f46e5',
              fontWeight: '600',
            }}
          >
            {metadata.platform.toUpperCase()}
          </Chip>
        </View>
      </View>

      {/* Content */}
      <Card.Content style={styles.content}>
        <Text variant="titleLarge" style={styles.title} numberOfLines={2}>
          {metadata.title}
        </Text>

        <View style={styles.authorContainer}>
          <Avatar.Text size={32} label={metadata.author[0]} />
          <View style={styles.authorInfo}>
            <Text variant="bodyMedium" style={styles.authorName}>
              {metadata.author}
            </Text>
            <Text variant="bodySmall" style={styles.authorRole}>
              Content Creator
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 208,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 96,
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  chip: {
    borderWidth: 0,
  },
  content: {
    paddingTop: 16,
  },
  title: {
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontWeight: '600',
    color: '#374151',
  },
  authorRole: {
    color: '#9ca3af',
  },
});
```

### 3. Custom Empty State Component

```tsx
// components/EmptyState.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Button, Text } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <Surface style={styles.container} elevation={0}>
      {/* Icon Circle */}
      <View style={styles.iconContainer}>
        <Feather name={icon} size={48} color="#6366f1" />
      </View>

      {/* Text */}
      <Text variant="headlineSmall" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={styles.description}>
        {description}
      </Text>

      {/* Action Button */}
      {actionLabel && onAction && (
        <Button
          mode="contained"
          onPress={onAction}
          icon="plus"
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          {actionLabel}
        </Button>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: 128,
    height: 128,
    backgroundColor: '#eef2ff',
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 280,
  },
  button: {
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
```

### 4. Custom Gradient Header

```tsx
// components/GradientHeader.tsx
import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export const GradientHeader: React.FC<GradientHeaderProps> = ({
  title,
  subtitle,
  rightAction,
}) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text variant="displaySmall" style={styles.title}>
              {title}
            </Text>
            {subtitle && (
              <Text variant="bodyMedium" style={styles.subtitle}>
                {subtitle}
              </Text>
            )}
          </View>

          {rightAction && <View style={styles.action}>{rightAction}</View>}
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#e0e7ff',
  },
  action: {
    marginLeft: 16,
  },
});
```

## File Structure

```
app/
├── _layout.tsx                    # Root layout with Paper Provider
├── (tabs)/
│   ├── _layout.tsx                # Tab navigation
│   ├── index.tsx                  # Home screen
│   └── downloads.tsx              # Downloads screen
components/
├── GradientHeader.tsx             # Custom gradient header
├── VideoInput.tsx                 # Paper TextInput wrapper
├── VideoMetadataCard.tsx          # Custom video card with gradient
├── DownloadProgress.tsx           # Custom progress component
├── VideoListItem.tsx              # Download list item card
├── EmptyState.tsx                 # Empty state component
└── VideoPlayerModal.tsx           # Video playback modal
services/
├── videoDownloader.ts             # API calls & download logic
│   ├── fetchVideoMetadata()       # Fetch video info
│   └── downloadVideo()            # Download with progress
└── storage.ts                     # MediaLibrary storage
    ├── saveVideo()                # Save to gallery
    ├── getDownloadedVideos()      # Get download history
    ├── deleteVideo()              # Delete video
    └── formatFileSize()           # Format file size
utils/
├── urlValidator.ts                # URL validation & platform detection
└── formatters.ts                  # Date and size formatters
types/
└── index.ts                       # TypeScript interfaces
theme/
├── paperTheme.ts                  # React Native Paper theme
├── colors.ts                      # Color palette
└── typography.ts                  # Typography system
```

## Setup & Configuration

### 1. Install React Native Paper

```bash
npm install react-native-paper
npm install react-native-vector-icons
npm install react-native-safe-area-context
npm install expo-linear-gradient
```

### 2. Configure Paper Provider

```tsx
// app/_layout.tsx
import { PaperProvider } from 'react-native-paper';
import { theme } from '@/theme/paperTheme';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
```

### 3. Theme Configuration

```typescript
// theme/paperTheme.ts
import { MD3LightTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  displayLarge: {
    fontSize: 57,
    fontWeight: '400',
    lineHeight: 64,
  },
  displayMedium: {
    fontSize: 45,
    fontWeight: '400',
    lineHeight: 52,
  },
  displaySmall: {
    fontSize: 36,
    fontWeight: '400',
    lineHeight: 44,
  },
  headlineLarge: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  headlineMedium: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  headlineSmall: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  titleLarge: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
  },
  titleMedium: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  titleSmall: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  labelLarge: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  labelMedium: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  labelSmall: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 16,
  },
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6366f1',
    secondary: '#a855f7',
    tertiary: '#ec4899',
    error: '#ef4444',
    background: '#f9fafb',
    surface: '#ffffff',
    surfaceVariant: '#f3f4f6',
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
    onTertiary: '#ffffff',
    onBackground: '#111827',
    onSurface: '#111827',
    onSurfaceVariant: '#6b7280',
    outline: '#e5e7eb',
    outlineVariant: '#d1d5db',
    inverseSurface: '#1f2937',
    inverseOnSurface: '#f9fafb',
    inversePrimary: '#a5b4fc',
    backdrop: 'rgba(0, 0, 0, 0.4)',
  },
  fonts: configureFonts({ config: fontConfig }),
  roundness: 12,
};
```

## Design Principles

### Modern UI Guidelines (Expo Go Compatible)

1. **Material Design 3**: Follow MD3 guidelines with React Native Paper
2. **Gradients**: Use `expo-linear-gradient` for beautiful backgrounds
3. **Smooth Animations**: Implement micro-interactions with `Animated` API
4. **Elevation & Shadows**: Use Paper's built-in elevation system
5. **Dark Mode Ready**: Prepare color system for dark theme
6. **Accessibility**: Use Paper's built-in accessibility features

### Component Styling Patterns

**Cards:**

```tsx
<Card style={{ borderRadius: 16 }} elevation={2}>
  <Card.Content>
    {/* Content */}
  </Card.Content>
</Card>
```

**Buttons:**

```tsx
<Button
  mode="contained"
  icon="download"
  style={{ borderRadius: 12 }}
  contentStyle={{ paddingVertical: 8 }}
>
  Download
</Button>
```

**Inputs:**

```tsx
<TextInput
  mode="outlined"
  label="Video URL"
  outlineStyle={{ borderRadius: 12 }}
  left={<TextInput.Icon icon="link" />}
/>
```

## Additional Features

### 1. Haptic Feedback

```typescript
import * as Haptics from 'expo-haptics';

// On button press
const handleDownload = async () => {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  // ... download logic
};
```

### 2. Snackbar Notifications

```tsx
import { Snackbar } from 'react-native-paper';

<Snackbar
  visible={visible}
  onDismiss={() => setVisible(false)}
  duration={3000}
  action={{
    label: 'Undo',
    onPress: () => {
      // Do something
    },
  }}
>
  Download Complete!
</Snackbar>
```

### 3. Pull to Refresh

```tsx
import { RefreshControl } from 'react-native';

<FlatList
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="#6366f1"
      colors={['#6366f1']}
    />
  }
/>
```

## Build Configuration (Expo Go Compatible)

### app.json / app.config.js

```json
{
  "expo": {
    "name": "Vid-Saver",
    "slug": "vid-saver",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "vidsaver",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#6366f1"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "bundleIdentifier": "com.faizangondal.vidsaver",
      "infoPlist": {
        "NSPhotoLibraryUsageDescription": "Save downloaded videos to your gallery",
        "NSPhotoLibraryAddUsageDescription": "Permission to save videos"
      },
      "supportsTablet": true,
      "userInterfaceStyle": "automatic"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#E6F4FE",
        "monochromeImage": "./assets/images/adaptive-icon.png"
      },
      "package": "com.faizangondal.vidsaver",
      "permissions": [
        "INTERNET",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "READ_MEDIA_VIDEO",
        "READ_MEDIA_IMAGES"
      ],
      "userInterfaceStyle": "automatic"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-media-library",
        {
          "photosPermission": "Allow Vid-Saver to save videos to your gallery.",
          "savePhotosPermission": "Allow Vid-Saver to save videos to your photos.",
          "isAccessMediaLocationEnabled": true
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

## Running with Expo Go

### Development Commands

```bash
# Install dependencies
npm install

# Start Expo Go development server
npx expo start

# Scan QR code with:
# - Expo Go app on Android
# - Camera app on iOS (will open in Expo Go)
```

### Key Expo Go Limitations to Avoid

❌ **Do NOT use these (require development build):**

* Custom native modules
* `react-native-reanimated` (v2/v3)
* `react-native-gesture-handler` beyond basic gestures
* Native code modifications
* Custom fonts via `expo-font` (use system fonts instead)

✅ **Safe to use with Expo Go:**

* All Expo SDK packages
* React Native Paper (pure JS/TS)
* expo-linear-gradient
* expo-haptics
* expo-av
* expo-media-library
* expo-file-system
* React Navigation
* Axios

## Success Criteria

✅ **Expo Go Compatible** - Runs without development build\
✅ Modern, premium UI with React Native Paper\
✅ Material Design 3 components and theming\
✅ Smooth animations and micro-interactions\
✅ Accessible design with built-in ARIA support\
✅ Downloads HD videos without watermarks\
✅ Beautiful gradient designs\
✅ Custom components for enhanced UX\
✅ Clean, maintainable code structure\
✅ Responsive to all screen sizes\
✅ Dark mode compatible color system\
✅ Share intent integration\
✅ Progress tracking with animations\
✅ Error handling with beautiful dialogs and snackbars\
✅ Haptic feedback for premium feel\
✅ Pull-to-refresh support
