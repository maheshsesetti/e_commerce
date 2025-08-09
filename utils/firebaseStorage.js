const { bucket } = require('../config/firebase');

/**
 * Upload a single image to Firebase Storage
 * @param {Buffer} fileBuffer - The file buffer
 * @param {string} fileName - The file name
 * @param {string} folder - The folder path in storage (e.g., 'products', 'users')
 * @returns {Promise<string>} - The public URL of the uploaded image
 */
const uploadImage = async (fileBuffer, fileName, folder = 'products') => {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const uniqueFileName = `${folder}/${timestamp}_${fileName}`;
    
    // Create file reference
    const file = bucket.file(uniqueFileName);
    
    // Upload file
    await file.save(fileBuffer, {
      metadata: {
        contentType: 'image/jpeg', // You might want to detect this dynamically
      },
      public: true, // Make the file publicly accessible
    });
    
    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueFileName}`;
    
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image to Firebase Storage:', error);
    throw new Error('Failed to upload image');
  }
};

/**
 * Upload multiple images to Firebase Storage
 * @param {Array} files - Array of file objects with buffer and originalname
 * @param {string} folder - The folder path in storage
 * @returns {Promise<Array<string>>} - Array of public URLs
 */
const uploadMultipleImages = async (files, folder = 'products') => {
  try {
    const uploadPromises = files.map(file => 
      uploadImage(file.buffer, file.originalname, folder)
    );
    
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw new Error('Failed to upload images');
  }
};

/**
 * Delete an image from Firebase Storage
 * @param {string} imageUrl - The public URL of the image
 * @returns {Promise<void>}
 */
const deleteImage = async (imageUrl) => {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/');
    const filePath = urlParts.slice(3).join('/'); // Remove domain parts
    
    const file = bucket.file(filePath);
    await file.delete();
  } catch (error) {
    console.error('Error deleting image from Firebase Storage:', error);
    // Don't throw error as the file might not exist
  }
};

/**
 * Delete multiple images from Firebase Storage
 * @param {Array<string>} imageUrls - Array of public URLs
 * @returns {Promise<void>}
 */
const deleteMultipleImages = async (imageUrls) => {
  try {
    const deletePromises = imageUrls.map(url => deleteImage(url));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting multiple images:', error);
  }
};

module.exports = {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  deleteMultipleImages
}; 