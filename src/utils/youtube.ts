/**
 * Utility functions for YouTube video URLs and embeds
 */

export function extractYouTubeId(url: string | undefined): string | null {
    if (!url || typeof url !== 'string') return null;
    const cleanUrl = url.trim();
    if (!cleanUrl) return null;

    // Matches:
    // youtube.com/watch?v=VIDEO_ID
    // youtu.be/VIDEO_ID
    // youtube.com/shorts/VIDEO_ID
    // youtube.com/embed/VIDEO_ID
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?/\s]{11})/i;
    const match = cleanUrl.match(regex);
    if (match && match[1]) {
        return match[1];
    }

    // Direct 11-char ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
        return cleanUrl;
    }

    return null;
}

export function getYouTubeThumbnail(videoId: string, quality: 'maxres' | 'hq' = 'maxres'): string {
    return `https://img.youtube.com/vi/${videoId}/${quality === 'maxres' ? 'maxresdefault' : 'hqdefault'}.jpg`;
}

export function getYouTubeEmbedUrl(videoId: string, autoplay: boolean = true): string {
    const params = new URLSearchParams({
        autoplay: autoplay ? '1' : '0',
        rel: '0',
        modestbranding: '1',
        playsinline: '1'
    });
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}
