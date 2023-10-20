import { hexToRgb } from "./colorConversion";

function shouldDarken(hex: string) {
    const [r, g, b] = hexToRgb(hex);
    // Calculate the luminance using the relative luminance formula
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 128;  // If the color is more bright (closer to white), return true
}

export default shouldDarken;