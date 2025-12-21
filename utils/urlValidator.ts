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

export const isValidVideoUrl = (url: string): boolean => {
    return isInstagramUrl(url) || isTikTokUrl(url);
};

export const getPlatformFromUrl = (url: string): 'instagram' | 'tiktok' | null => {
    if (isInstagramUrl(url)) return 'instagram';
    if (isTikTokUrl(url)) return 'tiktok';
    return null;
};
