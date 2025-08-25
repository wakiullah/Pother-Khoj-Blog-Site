export function getBaseUrl() {
    if (typeof window !== 'undefined') {
        // Client-side: use current origin
        return window.location.origin + '/';
    }

    // Server-side
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}/`;
    }

    return process.env.BASE_URL || 'http://localhost:3000/';
}