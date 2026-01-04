export const isInstagramUrl = (url: string): boolean => {
    const instagramPatterns = [
        /^https?:\/\/(www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+/,
        /^https?:\/\/(www\.)?instagram\.com\/reel\/[A-Za-z0-9_-]+/,
        /^https?:\/\/(www\.)?instagram\.com\/tv\/[A-Za-z0-9_-]+/,
    ];
    return instagramPatterns.some(pattern => pattern.test(url));
};

export const isTikTokUrl = (url: string): boolean => {
    const tiktokPatterns = [
        /^https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/,
        /^https?:\/\/(vm|vt)\.tiktok\.com\/[A-Za-z0-9]+/,
    ];
    return tiktokPatterns.some(pattern => pattern.test(url));
};

export const isYouTubeUrl = (url: string): boolean => {
    const youtubePatterns = [
        /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
        /^https?:\/\/(www\.)?youtu\.be\/[\w-]+/,
        /^https?:\/\/(www\.)?youtube\.com\/shorts\/[\w-]+/,
    ];
    return youtubePatterns.some(pattern => pattern.test(url));
};

export const isFacebookUrl = (url: string): boolean => {
    const facebookPatterns = [
        /^https?:\/\/(www\.)?facebook\.com\/.*\/videos\//,
        /^https?:\/\/(www\.)?fb\.watch\//,
    ];
    return facebookPatterns.some(pattern => pattern.test(url));
};

export const isTwitterUrl = (url: string): boolean => {
    const twitterPatterns = [
        /^https?:\/\/(www\.)?(twitter|x)\.com\/.*\/status\/\d+/,
    ];
    return twitterPatterns.some(pattern => pattern.test(url));
};

export const isValidVideoUrl = (url: string): boolean => {
    // Support Instagram, TikTok, YouTube, Facebook, Twitter
    // FastAPI backend supports 1000+ platforms via yt-dlp
    return (
        isInstagramUrl(url) ||
        isTikTokUrl(url) ||
        isYouTubeUrl(url) ||
        isFacebookUrl(url) ||
        isTwitterUrl(url) ||
        // Also accept any URL that looks like a video link
        /^https?:\/\/.+/.test(url)
    );
};

export const getPlatformFromUrl = (url: string): 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'twitter' | 'other' => {
    if (isInstagramUrl(url)) return 'instagram';
    if (isTikTokUrl(url)) return 'tiktok';
    if (isYouTubeUrl(url)) return 'youtube';
    if (isFacebookUrl(url)) return 'facebook';
    if (isTwitterUrl(url)) return 'twitter';
    return 'other';
};

/**
 * Extract URL from text (removes surrounding text and cleans params)
 */
export const extractUrlFromText = (text: string): string | null => {
    // 1. Find the URL
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);
    if (!matches) return null;

    let url = matches[0];

    // 2. Remove trailing punctuation (periods, commas, etc.)
    url = url.replace(/[.,;)]+$/, "");

    // 3. Clean Instagram URLs (remove query params like igsh)
    if (url.includes('instagram.com')) {
        try {
            const urlObj = new URL(url);
            // Return just the origin and pathname
            // e.g. https://www.instagram.com/p/CODE/
            return `${urlObj.origin}${urlObj.pathname}`;
        } catch (e) {
            // If URL parsing fails, ignore query cleaning
        }
    }

    return url;
};
