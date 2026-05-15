/**
 * Optimizes a Cloudinary image URL by injecting transformation parameters.
 * Helps stay within Cloudinary's Free Tier bandwidth limits.
 * 
 * @param {string} url - The original Cloudinary image URL
 * @param {number} width - The target width for resizing (default: 800)
 * @returns {string} - The optimized URL
 */
export const optimizeCloudinaryUrl = (url, width = 800) => {
    if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) {
      return url;
    }
  
    // Check if the URL already has transformations
    if (url.includes('/upload/')) {
      const parts = url.split('/upload/');
      // Inject q_auto (auto quality), f_auto (auto format like WebP), and w_width
      return `${parts[0]}/upload/q_auto,f_auto,w_${width}/${parts[1]}`;
    }
  
    return url;
  };
