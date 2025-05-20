import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validates if a string is a valid URL that could potentially be an image URL
 * @param text The text to validate as URL
 * @param checkImageHints Whether to check for image-related hints in the URL (optional, default: false)
 * @returns boolean indicating if the text is a valid URL
 */
export function isValidImageUrl(text: string, checkImageHints: boolean = false): boolean {
  // Basic check if the input is empty or not a string
  if (!text || typeof text !== 'string') {
    return false;
  }

  // Use URL constructor for basic URL validation
  try {
    const url = new URL(text);
    
    // Check if protocol is http or https
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return false;
    }
    
    // Optional: Check for image-related hints in the URL
    if (checkImageHints) {
      // Common image file extensions
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.tiff', '.ico', '.avif'];
      
      // Check for image extensions in the pathname
      const hasImageExtension = imageExtensions.some(ext => 
        url.pathname.toLowerCase().endsWith(ext)
      );
      
      // Check for image-related patterns in the URL path or query parameters
      const lowercaseUrl = url.toString().toLowerCase();
      const hasImagePattern = 
        /\/img\/|\/image\/|\/images\/|\/media\/|\/photos\/|\/thumbnails\/|\/picture\//.test(lowercaseUrl) ||
        /[?&](image|img|photo|pic)=/.test(lowercaseUrl) ||
        /\/(media|content|cdn|assets)\//.test(lowercaseUrl);
        
      // If neither condition is met, it might not be an image URL
      if (!hasImageExtension && !hasImagePattern) {
        // Still allow CDN URLs that often don't have extensions or clear patterns
        const isCdnUrl = /cloudinary\.com|cloudfront\.net|imgur\.com|imgix\.net|res\.cloudinary\.com/.test(lowercaseUrl);
        if (!isCdnUrl) {
          return false;
        }
      }
    }
    
    return true;
  } catch (error) {
    return false;
  }
}