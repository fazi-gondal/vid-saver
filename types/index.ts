export interface VideoMetadata {
    url: string;
    title: string;
    thumbnail: string;
    duration?: number;
    platform: 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'twitter' | 'vimeo' | 'reddit' | 'other';
    author?: string;
    uploader?: string;
    filesize?: number;
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

// FastAPI Response Types
export interface FastAPIMetadataResponse {
    success: boolean;
    data: {
        title: string;
        thumbnail: string;
        duration: number;
        uploader: string;
        platform: string;
        url: string;
        filesize?: number;
    };
    error?: string;
}

export interface FastAPIDirectURLResponse {
    success: boolean;
    data: {
        direct_url: string;
        filename: string;
        filesize: number;
        expires_in: number;
    };
    error?: string;
}

