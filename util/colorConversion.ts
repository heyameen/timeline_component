export function hexToRgb(hex: string) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse r, g, b values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r, g, b];
}

export function rgbToHex(r: number, g: number, b: number): string {
    return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
}

export function lightenColor(hex: string, percent:number) {
    const [r, g, b] = hexToRgb(hex);
    const amount = (percent / 100) * 255;
    return rgbToHex(Math.min(255, r + amount), Math.min(255, g + amount), Math.min(255, b + amount));
}

export function darkenColor(hex: string, percent:number) {
    const [r, g, b] = hexToRgb(hex);
    const amount = (percent / 100) * 255;
    return rgbToHex(Math.max(0, r - amount), Math.max(0, g - amount), Math.max(0, b - amount));
}

export function invertColor(hex: string) {
    const [r, g, b] = hexToRgb(hex);
    return rgbToHex(255 - r, 255 - g, 255 - b);
}