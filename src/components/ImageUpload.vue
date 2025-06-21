<template>
  <div class="image-upload-container">
    <!-- File Upload Area -->
    <div
      class="upload-area"
      :class="{ 'has-image': imagePreview, 'dragover': isDragOver }"
      @click="triggerFileInput"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="handleDrop"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="handleFileSelect"
        class="hidden"
      />

      <div v-if="!imagePreview" class="upload-placeholder">
        <el-icon class="upload-icon"><Upload /></el-icon>
        <p class="upload-text">Click to upload or drag and drop</p>
        <p class="upload-hint">PNG, JPG, JPEG up to 5MB</p>
      </div>

      <div v-else class="image-preview">
        <img :src="imagePreview" alt="Preview" class="preview-image" />
        <div class="preview-overlay">
          <el-button
            type="danger"
            size="small"
            circle
            @click.stop="removeImage"
            class="remove-btn"
          >
            <el-icon><Delete /></el-icon>
          </el-button>
        </div>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Upload, Delete } from '@element-plus/icons-vue';

interface Props {
  modelValue?: string;
  maxSize?: number; // in MB
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
  (e: 'file-selected', file: File): void;
}

const props = withDefaults(defineProps<Props>(), {
  maxSize: 5
});

const emit = defineEmits<Emits>();

const fileInput = ref<HTMLInputElement>();
const imagePreview = ref<string>('');
const isDragOver = ref(false);
const error = ref<string>('');

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  if (newValue && newValue !== imagePreview.value) {
    imagePreview.value = newValue;
  }
}, { immediate: true });

const triggerFileInput = () => {
  fileInput.value?.click();
};

const validateFile = (file: File): boolean => {
  error.value = '';

  // Check file type
  if (!file.type.startsWith('image/')) {
    error.value = 'Please select an image file';
    return false;
  }

  // Check file size
  const maxSizeBytes = props.maxSize * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    error.value = `File size must be less than ${props.maxSize}MB`;
    return false;
  }

  return true;
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file && validateFile(file)) {
    processFile(file);
  }

  // Reset input value to allow selecting the same file again
  target.value = '';
};

const handleDrop = (event: DragEvent) => {
  isDragOver.value = false;
  const files = event.dataTransfer?.files;

  if (files && files.length > 0) {
    const file = files[0];
    if (validateFile(file)) {
      processFile(file);
    }
  }
};

const processFile = (file: File) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    const result = e.target?.result as string;
    imagePreview.value = result;
    emit('update:modelValue', result);
    emit('file-selected', file);
  };

  reader.readAsDataURL(file);
};

const removeImage = () => {
  imagePreview.value = '';
  emit('update:modelValue', '');
  error.value = '';
};
</script>

<style scoped>
.image-upload-container {
  width: 100%;
}

.upload-area {
  position: relative;
  width: 100%;
  height: 200px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #fafafa;
}

.upload-area:hover {
  border-color: #409eff;
  background-color: #f0f9ff;
}

.upload-area.dragover {
  border-color: #409eff;
  background-color: #f0f9ff;
  transform: scale(1.02);
}

.upload-area.has-image {
  border-style: solid;
  border-color: #67c23a;
}

.upload-placeholder {
  text-align: center;
  color: #8c8d91;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 8px;
  color: #c0c4cc;
}

.upload-text {
  font-size: 16px;
  font-weight: 500;
  margin: 8px 0 4px 0;
}

.upload-hint {
  font-size: 12px;
  color: #c0c4cc;
  margin: 0;
}

.image-preview {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-overlay {
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-preview:hover .preview-overlay {
  opacity: 1;
}

.remove-btn {
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.remove-btn:hover {
  background-color: #f56c6c;
  color: white;
}

.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 4px;
}

.hidden {
  display: none;
}
</style>
