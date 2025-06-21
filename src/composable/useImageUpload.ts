import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { uploadImage as apiUploadImage } from './apiCalling';

/**
 * A dedicated composable for handling image uploads.
 * It encapsulates the upload logic, loading state, and user feedback.
 */
export function useImageUpload() {
  const isUploading = ref(false);

  /**
   * Uploads an image file and handles UI feedback.
   * @param file The image file to upload.
   * @returns A promise that resolves with the image URL on success, or null on failure.
   */
  const upload = async (file: File): Promise<string | null> => {
    isUploading.value = true;
    try {
      const response = await apiUploadImage(file);
      if (response.statusCode === 200 && response.data?.accessUrl) {
        ElMessage.success('Image uploaded successfully!');
        return response.data.accessUrl;
      } else {
        // Handle cases where the API returns a 200 status but a logical error.
        ElMessage.error(response.message || 'Upload failed to return a valid URL.');
        return null;
      }
    } catch {
      // The error is already logged in apiCalling.ts.
      // We can add a generic user-facing message here if desired.
      ElMessage.error('A network error occurred during upload.');
      return null;
    } finally {
      isUploading.value = false;
    }
  };

  return {
    isUploading,
    upload,
  };
}
