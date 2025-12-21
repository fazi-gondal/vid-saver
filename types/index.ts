export interface VideoMetadata {
    url: string;
    title: string;
    thumbnail: string;
    duration?: number;
    platform: 'instagram' | 'tiktok';
    author?: string;
}

export interface DownloadedVideo {
    id: string;
    metadata: VideoMetadata;
    localUri: string;
    downloadedAt: number;
    fileSize: number;
}

export interface DownloadProgress {
    totalBytes: number;
    downloadedBytes: number;
    percentage: number;
}

export interface ApiVideoResponse {
    success: boolean;
    data?: {
        title?: string;
        description?: string;
        thumbnail?: string;
        cover?: string;
        url?: string;
        video?: string;
        downloadUrl?: string;
        author?: string;
        username?: string;
        medias?: Array<{ url: string; type?: string }>;
        links?: string[];
    } | any; // Allow any for flexibility with different API responses
    error?: string;
    msg?: string; // Some errors return 'msg' instead of 'error'
}
