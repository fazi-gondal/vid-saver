# Complete Prompt for Vid-Saver App with HeroUI-Native

Build a professional Instagram and TikTok video downloader app using React Native Expo with **HeroUI-Native** components and modern UI design.

## App Overview

**Name:** Vid-Saver\
**Type:** React Native Expo App (Development Build)\
**Purpose:** Download HD videos from Instagram and TikTok without watermarks\
**UI Library:** HeroUI-Native\
**Styling:** Utility-first (Tailwind CSS via HeroUI-Native)

## Technology Stack

### Framework & Build

* **Expo SDK:** ~54.0.27
* **React:** 19.1.0
* **React Native:** 0.81.5
* **Build Type:** Development build (not Expo Go)
* **Navigation:** Expo Router (~6.0.17)
* **TypeScript:** ~5.9.2

### UI & Styling

* **HeroUI-Native:** Latest version (Modern React Native UI library)
* **Tailwind CSS:** Built-in with HeroUI-Native
* **React Aria:** For accessibility (built-in with HeroUI-Native)
* **Design Philosophy:** Modern, clean, accessible, premium UI

**Installation:**

```bash
npm install @heroui/native
npx pod-install # For iOS
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
* `CloseButton`, `Progress` (if available)

### Key Expo Packages

```json
"expo-router": "~6.0.17",
"expo-file-system": "^19.0.20",
"expo-media-library": "^18.2.1",
"expo-secure-store": "^15.0.8",
"expo-status-bar": "~3.0.9",
"expo-linking": "~8.0.10",
"expo-splash-screen": "~31.0.12",
"expo-constants": "~18.0.11",
"expo-image": "~3.0.11",
"expo-av": "~15.0.1"
```

### Navigation & Icons

```json
"@react-navigation/native": "^7.1.8",
"@react-navigation/bottom-tabs": "^7.4.0",
"@react-navigation/elements": "^2.6.3",
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
}
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

### 1. Home Screen

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
import { ScrollView, View, Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

// Home Screen Layout
<ScrollView className="flex-1 bg-neutral-50">
  {/* Header */}
  <Surface className="bg-primary-500 px-6 pt-12 pb-6 rounded-b-3xl">
    <Text className="text-white text-3xl font-bold">Vid-Saver</Text>
    <Text className="text-primary-100 text-sm mt-1">
      Download videos without watermarks
    </Text>
  </Surface>

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
  </View>
</ScrollView>
```

### 2. Downloads Screen

**Layout Components:**

* List of downloaded videos (Custom `VideoList`)
* Video items (HeroUI `Card` based)
* Empty state (HeroUI `Surface` with custom illustration)
* Delete confirmation (HeroUI `Modal`)
* Video player modal (HeroUI `Modal` with expo-av)

**Component Structure:**

```tsx
import { 
  Card, 
  Button, 
  Modal, 
  Avatar,
  Chip,
  Surface,
  Listbox
} from '@heroui/native';
import { FlatList, View, Image, Pressable } from 'react-native';
import { Video } from 'expo-av';
import Feather from '@expo/vector-icons/Feather';

// Downloads Screen
<View className="flex-1 bg-neutral-50">
  {/* Header */}
  <Surface className="bg-white px-6 pt-12 pb-4 border-b border-neutral-200">
    <Text className="text-2xl font-bold text-neutral-900">Downloads</Text>
    <Text className="text-neutral-600 text-sm mt-1">
      {videos.length} video{videos.length !== 1 ? 's' : ''} saved
    </Text>
  </Surface>

  {videos.length === 0 ? (
    // Empty State
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-24 h-24 bg-neutral-100 rounded-full items-center justify-center mb-4">
        <Feather name="download" size={40} color="#9ca3af" />
      </View>
      <Text className="text-xl font-semibold text-neutral-900 mb-2">
        No Downloads Yet
      </Text>
      <Text className="text-neutral-600 text-center">
        Downloaded videos will appear here
      </Text>
    </View>
  ) : (
    // Video List
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      contentContainerClassName="p-4"
      ItemSeparatorComponent={() => <View className="h-3" />}
      renderItem={({ item }) => (
        <Card
          shadow="sm"
          radius="xl"
          isPressable
          onPress={() => handlePlayVideo(item)}
          className="overflow-hidden"
        >
          <Card.Body className="p-0">
            <View className="flex-row">
              {/* Thumbnail */}
              <Image
                source={{ uri: item.metadata.thumbnail }}
                className="w-28 h-28"
                resizeMode="cover"
              />

              {/* Video Info */}
              <View className="flex-1 p-3 justify-between">
                <View>
                  <Chip
                    size="sm"
                    color={item.metadata.platform === 'instagram' ? 'secondary' : 'primary'}
                    variant="flat"
                    className="mb-1 self-start"
                  >
                    {item.metadata.platform.toUpperCase()}
                  </Chip>
                  
                  <Text 
                    className="font-semibold text-neutral-900 text-sm"
                    numberOfLines={2}
                  >
                    {item.metadata.title}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-xs text-neutral-500">
                    {formatFileSize(item.fileSize)}
                  </Text>
                  <Text className="text-xs text-neutral-500">
                    {formatDate(item.downloadedAt)}
                  </Text>
                </View>
              </View>

              {/* Delete Button */}
              <Pressable
                onPress={() => handleDeletePrompt(item)}
                className="p-3 items-center justify-center"
              >
                <Feather name="trash-2" size={20} color="#ef4444" />
              </Pressable>
            </View>
          </Card.Body>
        </Card>
      )}
    />
  )}

  {/* Video Player Modal */}
  <Modal
    isOpen={playerVisible}
    onClose={() => setPlayerVisible(false)}
    size="full"
    classNames={{
      base: "bg-black",
    }}
  >
    <Modal.Content>
      <Modal.Header className="bg-transparent">
        <Button
          isIconOnly
          variant="light"
          onPress={() => setPlayerVisible(false)}
        >
          <Feather name="x" size={24} color="#fff" />
        </Button>
      </Modal.Header>
      
      <Modal.Body className="flex-1 items-center justify-center">
        {currentVideo && (
          <Video
            source={{ uri: currentVideo.localUri }}
            style={{ width: '100%', height: 300 }}
            useNativeControls
            resizeMode="contain"
            shouldPlay
          />
        )}
      </Modal.Body>
    </Modal.Content>
  </Modal>

  {/* Delete Confirmation Modal */}
  <Modal
    isOpen={deleteModalVisible}
    onClose={() => setDeleteModalVisible(false)}
    size="sm"
  >
    <Modal.Content>
      <Modal.Header>
        <Text className="text-lg font-semibold">Delete Video?</Text>
      </Modal.Header>
      
      <Modal.Body>
        <Text className="text-neutral-600">
          This will permanently delete the video from your device.
        </Text>
      </Modal.Body>
      
      <Modal.Footer>
        <Button
          variant="light"
          onPress={() => setDeleteModalVisible(false)}
        >
          Cancel
        </Button>
        <Button
          color="error"
          onPress={confirmDelete}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
</View>
```

### 3. Bottom Tab Navigation

**Using HeroUI Tabs Component:**

```tsx
import { Tabs } from '@heroui/native';
import Feather from '@expo/vector-icons/Feather';

<Tabs
  selectedKey={selectedTab}
  onSelectionChange={setSelectedTab}
  classNames={{
    base: "bg-white border-t border-neutral-200",
    tabList: "bg-transparent",
    tab: "h-16",
  }}
>
  <Tabs.Item
    key="home"
    title={
      <View className="items-center">
        <Feather 
          name="home" 
          size={24} 
          color={selectedTab === 'home' ? '#6366f1' : '#9ca3af'} 
        />
        <Text className={selectedTab === 'home' ? 'text-primary-500 text-xs mt-1' : 'text-neutral-400 text-xs mt-1'}>
          Home
        </Text>
      </View>
    }
  />
  
  <Tabs.Item
    key="downloads"
    title={
      <View className="items-center">
        <Feather 
          name="download" 
          size={24} 
          color={selectedTab === 'downloads' ? '#6366f1' : '#9ca3af'} 
        />
        <Text className={selectedTab === 'downloads' ? 'text-primary-500 text-xs mt-1' : 'text-neutral-400 text-xs mt-1'}>
          Downloads
        </Text>
      </View>
    }
  />
</Tabs>
```

## Custom Components

### 1. Custom Progress Bar (Since HeroUI may not have it)

```tsx
// components/DownloadProgress.tsx
import { View, Animated } from 'react-native';
import { Card } from '@heroui/native';

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
  const animatedWidth = new Animated.Value(progress);

  Animated.timing(animatedWidth, {
    toValue: progress,
    duration: 300,
    useNativeDriver: false,
  }).start();

  return (
    <Card shadow="sm" className="mb-4">
      <Card.Body>
        <View className="flex-row items-center justify-between mb-3">
          <Text className="font-semibold text-neutral-900">Downloading...</Text>
          <Text className="text-primary-600 font-bold text-lg">
            {progress.toFixed(0)}%
          </Text>
        </View>
        
        {/* Progress Bar */}
        <View className="h-3 bg-neutral-100 rounded-full overflow-hidden">
          <Animated.View
            style={{
              height: '100%',
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
            }}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          />
        </View>
        
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-xs text-neutral-500">
            {formatFileSize(downloadedBytes)}
          </Text>
          <Text className="text-xs text-neutral-500">
            {formatFileSize(totalBytes)}
          </Text>
        </View>
      </Card.Body>
    </Card>
  );
};
```

### 2. Custom Video Metadata Card

```tsx
// components/VideoMetadataCard.tsx
import { View, Image } from 'react-native';
import { Card, Avatar, Chip } from '@heroui/native';
import { VideoMetadata } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';

interface VideoMetadataCardProps {
  metadata: VideoMetadata;
}

export const VideoMetadataCard: React.FC<VideoMetadataCardProps> = ({ metadata }) => {
  return (
    <Card
      shadow="lg"
      radius="xl"
      className="overflow-hidden mb-4"
    >
      {/* Thumbnail with Gradient Overlay */}
      <View className="relative">
        <Image
          source={{ uri: metadata.thumbnail }}
          className="w-full h-52"
          resizeMode="cover"
        />
        
        {/* Gradient Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          className="absolute bottom-0 left-0 right-0 h-24"
        />
        
        {/* Platform Badge */}
        <View className="absolute top-3 right-3">
          <Chip
            color={metadata.platform === 'instagram' ? 'secondary' : 'primary'}
            variant="shadow"
            size="sm"
            startContent={
              <Feather 
                name={metadata.platform === 'instagram' ? 'instagram' : 'music'} 
                size={14} 
              />
            }
          >
            {metadata.platform.toUpperCase()}
          </Chip>
        </View>
      </View>

      {/* Content */}
      <Card.Body className="p-4">
        <Text className="text-lg font-bold text-neutral-900 mb-3" numberOfLines={2}>
          {metadata.title}
        </Text>
        
        <View className="flex-row items-center">
          <Avatar
            size="sm"
            name={metadata.author}
            className="mr-3"
            classNames={{
              base: "bg-gradient-to-br from-primary-400 to-secondary-500",
            }}
          />
          <View className="flex-1">
            <Text className="font-medium text-neutral-700">
              {metadata.author}
            </Text>
            <Text className="text-xs text-neutral-500">
              Content Creator
            </Text>
          </View>
        </View>
      </Card.Body>
    </Card>
  );
};
```

### 3. Custom Empty State Component

```tsx
// components/EmptyState.tsx
import { View } from 'react-native';
import { Surface, Button } from '@heroui/native';
import Feather from '@expo/vector-icons/Feather';
import LottieView from 'lottie-react-native';

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
    <Surface className="flex-1 items-center justify-center px-8 bg-transparent">
      {/* Icon Circle */}
      <View className="w-32 h-32 bg-primary-50 rounded-full items-center justify-center mb-6">
        <Feather name={icon} size={48} color="#6366f1" />
      </View>
      
      {/* Text */}
      <Text className="text-2xl font-bold text-neutral-900 mb-2 text-center">
        {title}
      </Text>
      <Text className="text-neutral-600 text-center mb-6 max-w-xs">
        {description}
      </Text>
      
      {/* Action Button */}
      {actionLabel && onAction && (
        <Button
          color="primary"
          size="lg"
          onPress={onAction}
          startContent={<Feather name="plus" size={20} color="#fff" />}
        >
          {actionLabel}
        </Button>
      )}
    </Surface>
  );
};
```

### 4. Custom Header Component

```tsx
// components/Header.tsx
import { View, StatusBar } from 'react-native';
import { Surface } from '@heroui/native';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, rightAction }) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 pt-12 pb-6 rounded-b-3xl"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-white text-3xl font-bold mb-1">
              {title}
            </Text>
            {subtitle && (
              <Text className="text-primary-100 text-sm">
                {subtitle}
              </Text>
            )}
          </View>
          
          {rightAction && (
            <View className="ml-4">
              {rightAction}
            </View>
          )}
        </View>
      </LinearGradient>
    </>
  );
};
```

## File Structure

```
app/
├── _layout.tsx                    # Root layout with HeroUI provider
├── (tabs)/
│   ├── _layout.tsx                # Tab navigation with HeroUI Tabs
│   ├── index.tsx                  # Home screen
│   └── downloads.tsx              # Downloads screen
components/
├── Header.tsx                     # Custom gradient header
├── VideoInput.tsx                 # HeroUI TextField wrapper
├── VideoMetadataCard.tsx          # Custom video card with gradient
├── DownloadProgress.tsx           # Custom animated progress bar
├── VideoListItem.tsx              # Download list item card
├── EmptyState.tsx                 # Empty state component
└── VideoPlayerModal.tsx           # Video playback modal
services/
├── videoDownloader.ts             # API calls & download logic
│   ├── fetchVideoMetadata()       # Fetch video info
│   └── downloadVideo()            # Download with progress
└── storage.ts                     # MediaLibrary & SecureStore
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
├── colors.ts                      # Color palette
├── typography.ts                  # Typography system
└── shadows.ts                     # Shadow definitions
```

## Setup & Configuration

### 1. Install HeroUI-Native

```bash
npm install @heroui/native
npm install react-native-svg # Required peer dependency
npx pod-install # iOS only
```

### 2. Configure HeroUI Provider

```tsx
// app/_layout.tsx
import { HeroUIProvider } from '@heroui/native';
import { theme } from '@/theme/colors';

export default function RootLayout() {
  return (
    <HeroUIProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </HeroUIProvider>
  );
}
```

### 3. Theme Configuration

```typescript
// theme/colors.ts
export const theme = {
  colors: {
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    // ... other colors
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
};
```

## Design Principles

### Modern UI Guidelines

1. **Glass Morphism**: Use semi-transparent backgrounds with blur effects
2. **Gradients**: Apply subtle gradients to cards and buttons
3. **Smooth Animations**: Implement micro-interactions for better UX
4. **Neumorphism**: Soft shadows for depth
5. **Dark Mode Ready**: Prepare color system for dark theme
6. **Accessibility**: Use HeroUI's built-in ARIA support

### Component Styling Patterns

**Cards:**

```tsx
<Card
  shadow="lg"
  radius="xl"
  classNames={{
    base: "bg-white/90 backdrop-blur-md",
    body: "p-4",
  }}
>
```

**Buttons:**

```tsx
<Button
  color="primary"
  size="lg"
  radius="lg"
  className="shadow-lg shadow-primary-500/50"
  startContent={<Icon />}
>
```

**Inputs:**

```tsx
<TextField
  size="lg"
  radius="lg"
  variant="bordered"
  classNames={{
    base: "mb-4",
    input: "text-base",
    label: "font-medium",
  }}
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

### 2. Toast Notifications

```tsx
import { Toast } from '@heroui/native'; // If available

Toast.show({
  type: 'success',
  title: 'Download Complete!',
  message: 'Video saved to gallery',
  duration: 3000,
});
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

## Build Configuration

### Android

```json
{
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
    "userInterfaceStyle": "automatic",
    "statusBar": {
      "backgroundColor": "#6366f1",
      "barStyle": "light-content"
    }
  }
}
```

### iOS

```json
{
  "ios": {
    "bundleIdentifier": "com.faizangondal.vidsaver",
    "infoPlist": {
      "NSPhotoLibraryUsageDescription": "Save downloaded videos to your gallery",
      "NSPhotoLibraryAddUsageDescription": "Permission to save videos"
    },
    "userInterfaceStyle": "automatic"
  }
}
```

## Success Criteria

✅ Modern, premium UI with HeroUI-Native components\
✅ Smooth animations and micro-interactions\
✅ Accessible design with ARIA support\
✅ Downloads HD videos without watermarks\
✅ Beautiful gradient designs and glass morphism\
✅ Custom components where HeroUI doesn't provide\
✅ Clean, maintainable code structure\
✅ Responsive to all screen sizes\
✅ Dark mode compatible color system\
✅ Share intent integration\
✅ Progress tracking with custom animations\
✅ Error handling with beautiful alerts
