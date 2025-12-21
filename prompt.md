# Complete Prompt to Create Vid-Saver App

Build a professional Instagram and TikTok video downloader app using React Native Expo with the following specifications:

## App Overview

**Name:** Vid-Saver\
**Type:** React Native Expo App (Development Build)\
**Purpose:** Download HD videos from Instagram and TikTok without watermarks\\

## Technology Stack

### Framework & Build

* **Expo SDK:** ~54.0.27
* **React:** 19.1.0
* **React Native:** 0.81.5
* **Build Type:** Development build (not Expo Go)
* **Navigation:** Expo Router (~6.0.17)
* **TypeScript:** ~5.9.2

### Styling

* **NativeWind:** ^4.2.1 (Tailwind CSS for React Native)
* **Tailwind CSS:** ^3.4.18
* **Design:** Modern, clean, premium UI

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
"expo-image": "~3.0.11"
```

### Navigation & UI

```json
"@react-navigation/native": "^7.1.8",
"@react-navigation/bottom-tabs": "^7.4.0",
"@react-navigation/elements": "^2.6.3",
"react-native-safe-area-context": "~5.6.0",
"react-native-screens": "~4.16.0"
```

### Icons

```json
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
  * Example: For `https://www.instagram.com/reel/DCviRy-TQqt/`, shortcode is `DCviRy-TQqt`
* `renderableFormats` (optional): "720p,highres" - Specifies desired video quality

**Response Structure:**

```javascript
{
  // Metadata fetch response
  title: string | caption: string,
  thumbnail_url: string | cover_url: string | picture: string,
  username: string | owner.username: string,
  
  // Video download response
  contents: [{
    videos: [{
      url: string,      // Direct download URL
      quality: string,  // Video quality (e.g., "720p", "1080p")
      width: number,
      height: number
    }]
  }]
}
```

**Implementation Details:**

1. Extract shortcode from URL using regex
2. Make GET request to fetch metadata
3. Parse response for thumbnail, title, and author
4. For download, parse `contents[0].videos[0].url` for video URL
5. Select highest quality available from videos array

**Supported URL Formats:**

* Posts: `https://www.instagram.com/p/SHORTCODE/`
* Reels: `https://www.instagram.com/reel/SHORTCODE/`
* IGTV: `https://www.instagram.com/tv/SHORTCODE/`

### TikTok Video Download

**API:** TikWM API (Free - No Authentication)\
**Website:** [TikWM.com](https://www.tikwm.com/)\
**Endpoint:** `https://www.tikwm.com/api/?url={videoUrl}?hd=1`\
**Method:** GET\
**No API Key Required**

**Query Parameters:**

* `url` (required): Full TikTok video URL (URL-encoded)
* `hd=1`: Request HD quality video

**Response Structure:**

```javascript
{
  code: 0,  // 0 = success, other = error
  msg: string,
  data: {
    title: string,
    cover: string,           // Thumbnail URL
    origin_cover: string,    // Alternative thumbnail
    hdplay: string,          // HD video URL (preferred)
    play: string,            // Standard quality URL
    wmplay: string,          // Watermarked video URL (fallback)
    author: {
      nickname: string,
      unique_id: string
    }
  }
}
```

**Implementation Details:**

1. Encode full TikTok URL and append to API endpoint
2. Parse response to check `code === 0` for success
3. Extract metadata from `data` object
4. Select download URL with priority: `hdplay` > `play` > `wmplay`

**Download URL Priority:** hdplay (HD) > play (standard) > wmplay (with watermark)

**Supported URL Formats:**

* Standard: `https://www.tiktok.com/@username/video/1234567890`
* Short links: `https://vm.tiktok.com/SHORTCODE/`

## Color Scheme

**Primary Color:** `#6366f1` (Indigo-500)\
**Primary Variants:**

* primary-600: `#4f46e5`
* primary-700: `#4338ca`
* primary-100: Light background

**Status Bar:**

* Background: `#6366f1`
* Style: dark content

**Background:**

* Main: `#f9fafb` (gray-50)
* Cards: `#ffffff` (white)

## App Features

### 1. Home Screen

**Layout:**

* Header with app name "Vid-Saver" on top left
* Video URL input field (auto-paste from clipboard functionality)
* Video metadata card showing:
  * Thumbnail
  * Title
  * Author
  * Platform badge (Instagram/TikTok)
* Download progress bar with percentage
* Automatic download after metadata loads
* Retry button on download failure

**Icons Used:**

```tsx
import Feather from '@expo/vector-icons/Feather';
<Feather name="home" size={28} color="black" />
```

### 2. Downloads Screen

**Layout:**

* List view of downloaded videos
* Each item shows:
  * Video thumbnail
  * Title
  * Platform badge
  * Download date
  * File size
  * Delete button (trash-2 icon)
* Empty state with download icon

**Icons Used:**

```tsx
<Feather name="download" size={24} color="black" />
<Feather name="trash-2" size={20} color="#ef4444" />
```

### 3. Bottom Tab Navigation

**Tabs:**

1. Home - `<Feather name="home" />`
2. Downloads - `<Feather name="download" />`

## Core Functionality

### URL Validation

Support patterns:

* Instagram: `/p/`, `/reel/`, `/tv/`
* TikTok: `tiktok.com`, `vm.tiktok.com`

### Deep Linking (Share Intent)

**Scheme:** `vidsaver`\
**Intent Filter:** Accepts text/plain from Instagram/TikTok share menu\
**Behavior:** Auto-download video when shared from external app

### Download Flow

1. User pastes/shares video URL
2. Extract metadata (thumbnail, title, author)
3. Auto-download starts
4. Show progress (0-100%)
5. Save to device gallery
6. Store metadata in secure store
7. Show success message

### Storage

**Video Storage:** Device gallery (MediaLibrary)\
**Metadata Storage:** Expo SecureStore (encrypted)\
**File System:** expo-file-system/legacy

### Permissions

**Android:**

```json
"android.permission.INTERNET",
"android.permission.READ_EXTERNAL_STORAGE",
"android.permission.WRITE_EXTERNAL_STORAGE",
"android.permission.READ_MEDIA_VIDEO",
"android.permission.READ_MEDIA_IMAGES"
```

**iOS:**

```json
"NSPhotoLibraryUsageDescription": "Save downloaded videos",
"NSPhotoLibraryAddUsageDescription": "Permission to save videos"
```

**Permission Request:** On app startup (in \_layout.tsx)

## File Structure

```
app/
├── _layout.tsx          # Root layout with permissions
├── (tabs)/
│   ├── _layout.tsx      # Tab navigation
│   ├── index.tsx        # Home screen
│   └── downloads.tsx    # Downloads screen
components/
├── Header.tsx           # App header
├── VideoInput.tsx       # URL input field
├── VideoMetadataCard.tsx # Video preview card
├── DownloadProgress.tsx  # Progress bar
└── VideoListItem.tsx    # Downloaded video item
services/
├── videoDownloader.ts   # API calls & download logic
└── storage.ts           # MediaLibrary & SecureStore
utils/
└── urlValidator.ts      # URL validation & platform detection
types/
└── index.ts            # TypeScript interfaces
```

## Service Functions

### videoDownloader.ts

**Location:** `services/videoDownloader.ts`

#### fetchVideoMetadata(url: string): Promise<VideoMetadata>

Fetches video metadata (thumbnail, title, author) from Instagram or TikTok.

**Parameters:**

* `url`: Full video URL (Instagram or TikTok)

**Returns:**

```typescript
{
  url: string,
  title: string,
  thumbnail: string,
  platform: 'instagram' | 'tiktok',
  author: string
}
```

**Process:**

1. Detects platform using `getPlatformFromUrl()`
2. For Instagram: Extracts shortcode and calls RapidAPI
3. For TikTok: Calls TikWM API with full URL
4. Parses response and returns normalized metadata

#### downloadVideo(videoUrl: string, metadata: VideoMetadata, onProgress?: (progress: DownloadProgress) => void): Promise<string>

Downloads video file with progress tracking.

**Parameters:**

* `videoUrl`: Video URL to download
* `metadata`: Video metadata from fetchVideoMetadata
* `onProgress`: Optional callback for download progress

**Returns:** Local file URI of downloaded video

**Process:**

1. Fetches video download URL from appropriate API
2. For Instagram: Uses `contents[0].videos[0].url`
3. For TikTok: Uses `hdplay` > `play` > `wmplay`
4. Downloads with `FileSystem.createDownloadResumable()`
5. Tracks progress and calls onProgress callback
6. Returns local file URI upon completion

**Progress Object:**

```typescript
{
  totalBytes: number,
  downloadedBytes: number,
  percentage: number
}
```

### storage.ts

**Location:** `services/storage.ts`

#### saveVideo(localUri: string, metadata: VideoMetadata): Promise<DownloadedVideo>

Saves downloaded video to device gallery and stores metadata.

**Parameters:**

* `localUri`: Local file URI from downloadVideo
* `metadata`: Video metadata

**Returns:**

```typescript
{
  id: string,              // Media library asset ID
  metadata: VideoMetadata,
  localUri: string,        // Gallery URI
  downloadedAt: number,    // Timestamp
  fileSize: number         // File size in bytes
}
```

**Process:**

1. Checks MediaLibrary permissions
2. Creates asset in gallery (no album to avoid permission dialogs)
3. Gets file size
4. Stores metadata in SecureStore
5. Returns DownloadedVideo object

#### getDownloadedVideos(): Promise\<DownloadedVideo\[]>

Retrieves list of all downloaded videos from SecureStore.

**Returns:** Array of DownloadedVideo objects

**Storage:** Uses SecureStore with key `'downloaded_videos'`

#### deleteVideo(videoId: string): Promise<void>

Deletes video from gallery and removes metadata.

**Parameters:**

* `videoId`: Media library asset ID

**Process:**

1. Deletes from MediaLibrary using asset ID
2. Removes from SecureStore metadata list

#### formatFileSize(bytes: number): string

Formats file size for human-readable display.

**Returns:** Formatted string (e.g., "15.2 MB", "1.5 GB")

## Design Guidelines

### UI Principles

* **Modern:** Use rounded corners, shadows, gradients
* **Clean:** Ample white space, clear hierarchy
* **Premium:** Smooth animations, quality interactions
* **Responsive:** Handle all screen sizes

### Component Styling (NativeWind)

```tsx
// Cards
className="bg-white rounded-xl shadow-md p-4"

// Buttons
className="bg-primary-600 rounded-xl py-4 shadow-lg"

// Input
className="bg-white border border-gray-300 rounded-xl px-4 py-3"

// Badges
className="bg-primary-100 px-2 py-0.5 rounded-full"
```

### Typography

* Headings: font-bold, text-xl+
* Body: text-gray-600, text-sm/base
* Labels: text-xs, uppercase

## Build Configuration

### Android

**Adaptive Icon:**

* Background: `#E6F4FE`
* Foreground: `./assets/images/android-icon-foreground.png`
* Monochrome: Supported

**Features:**

* Edge-to-edge: Enabled
* New Architecture: Enabled
* Status bar color: `#6366f1`

## Important Implementation Notes

1. **No Album Creation:** Save videos directly to gallery (avoid permission dialogs)

2. **Error Handling:** Show retry button on download failure with persistent error message

3. **Progress Tracking:** Use FileSystem.createDownloadResumable with progress callback

4. **Auto-Download:** Automatically start download after metadata loads (no manual button in normal flow)

5. **Icon Library:** Use Feather icons from @expo/vector-icons exclusively

6. **Status Bar:** Use expo-status-bar (not react-native StatusBar)

7. **Legacy File System:** Import from 'expo-file-system/legacy'

## Testing Requirements

1. Test Instagram posts, reels, and TV videos
2. Test TikTok regular and short videos
3. Test share intent from both platforms
4. Verify no permission dialogs after initial setup
5. Test retry functionality on network failure
6. Verify videos appear in device gallery

## Success Criteria

✅ Downloads HD videos without watermarks\
✅ Supports Instagram and TikTok\
✅ Clean, modern UI\
✅ Share intent integration works\
✅ Auto-download on URL paste\
✅ Progress tracking\
✅ Persistent downloaded videos list\
✅ No repetitive permission dialogs\
✅ Error handling with retry option
