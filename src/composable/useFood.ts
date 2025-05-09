import { ref } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';

export const useFood = () => {
  const isLoading = ref(false);
  const foodForm = ref({
    foodName: '',
    description: '',
    price: null,
    category: '',
    imgUrl: '',
    status: true,
  });

  const foodFormRef = ref<FormInstance>();
  const rules = ref<FormRules>({
    foodName: [
      { required: true, message: 'Food name is required', trigger: 'blur' },
      { min: 2, message: 'Food name must be at least 2 characters', trigger: 'blur' },
    ],
    description: [{ required: true, message: 'Description is required', trigger: 'blur' }],
    price: [
      { required: true, message: 'Price is required', trigger: 'blur' },
      { type: 'number', min: 0, message: 'Price must be positive', trigger: 'blur' },
    ],
    category: [{ required: true, message: 'Category is required', trigger: 'blur' }],
    imgUrl: [{ required: true, message: 'Image URL is required', trigger: 'blur' }],
  });

  const handleCreateFood = async () => {
    if (!foodFormRef.value) return;
    await foodFormRef.value.validate(async (valid: boolean) => {
      if (valid) {
        await createFood();
      }
    });
  };

  const createFood = async () => {
    try {
      isLoading.value = true;
      const response = await fetch('http://localhost:5000/api/foods/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodForm.value),
      });
      const data = await response.json();
      if (response.ok) {
        ElMessage.success(data.message || 'Food created successfully!');
      } else {
        ElMessage.error(data.message || 'Failed to create food.');
      }
    } catch (error) {
      console.error('Create food error:', error);
      ElMessage.error('Failed to create food.');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    foodForm,
    rules,
    handleCreateFood,
    foodFormRef,
  };
};
