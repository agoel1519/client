/**
 * Aevora Direct Cloudinary Upload Service
 * Account: fryxycyd
 */

export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'fryxycyd',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '343131624618523',
  apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET || 'qiffBZDxa2s_U-We7ZlAnqW4mIU',
  folder: 'aevora'
};

/**
 * Generate SHA-1 hash using browser native Web Crypto API
 */
async function generateSha1(message) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Uploads any image (File, Blob, or base64 Data URL) directly to Cloudinary
 * Returns { success: true, url: secure_url, publicId, ... }
 */
export const uploadToCloudinary = async (fileOrBlob) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = CLOUDINARY_CONFIG.folder;

    // Parameters to sign in alphabetical order: folder, timestamp
    const stringToSign = `folder=${folder}&timestamp=${timestamp}${CLOUDINARY_CONFIG.apiSecret}`;
    const signature = await generateSha1(stringToSign);

    const formData = new FormData();
    formData.append('file', fileOrBlob);
    formData.append('api_key', CLOUDINARY_CONFIG.apiKey);
    formData.append('timestamp', timestamp);
    formData.append('folder', folder);
    formData.append('signature', signature);

    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;
    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `Cloudinary upload failed (status ${res.status})`);
    }

    const data = await res.json();
    return {
      success: true,
      url: data.secure_url || data.url,
      publicId: data.public_id,
      format: data.format,
      bytes: data.bytes
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message || 'Cloudinary upload failed'
    };
  }
};
