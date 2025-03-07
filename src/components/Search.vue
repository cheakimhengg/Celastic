<template>
  <el-input
    v-model="input"
    size="large"
    style="font-size: 1rem; height: 45px"
    placeholder="Search by name or category"
  >
    <template #prefix>
      <el-icon size="20" color="black"><Search /></el-icon>
    </template>

    <template #suffix>
      <el-icon
        v-if="input"
        size="20"
        color="black"
        @click="clearInput"
        class="cursor-pointer mr-2.5"
        ><CircleClose
      /></el-icon>
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import { Search, CircleClose } from '@element-plus/icons-vue';
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);
const input = ref(props.modelValue);

const clearInput = () => {
  input.value = '';
  emit('update:modelValue', input.value);
};

watch(input, (newValue) => {
  console.log('Search input changed to:', newValue);
  emit('update:modelValue', newValue);
});
</script>

<style scoped>
.el-input {
  --el-border-color: none;
  --el-border-color-hover: none;
  --el-input-focus-border-color: none;
}

:deep(.el-input__wrapper) {
  padding: 0 8px !important;
}
</style>
