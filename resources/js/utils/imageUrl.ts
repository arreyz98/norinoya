export function normalizeImageKitUrl(value: string): string {
    return value.trim().replace(/^https?:\/\/ik\.imagekit\.io(?=\/|$)/i, 'https://ik.imgkit.net');
}
