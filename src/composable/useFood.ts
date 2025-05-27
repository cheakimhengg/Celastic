import { ref } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import {
  getFood,
  createFood as apiCreateFood,
  deleteFood as apiDeleteFood,
  updateFood as apiUpdateFood,
} from './apiCalling';
import type { FoodItem, FoodApiCategory, FoodApiItem } from '@/models/food';

// Composable for food management
export const useFood = () => {
  // State
  const isLoading = ref(false);
  const foodForm = ref({
    foodName: '',
    description: '',
    price: 0,
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
    description: [
      { required: true, message: 'Description is required', trigger: 'blur' },
      { min: 2, message: 'Description must be at least 2 characters', trigger: 'blur' },
    ],
    price: [
      { required: true, message: 'Price is required', trigger: 'blur' },
      { type: 'number', min: 0.01, message: 'Price must be greater than 0', trigger: 'blur' },
    ],
    category: [{ required: true, message: 'Category is required', trigger: 'blur' }],
    imgUrl: [{ required: true, message: 'Image URL is required', trigger: 'blur' }],
    status: [{ required: true, message: 'Status is required', trigger: 'change' }],
  });
  const foods = ref<FoodItem[]>([]);

  // Fetch all foods
  const fetchFoods = async () => {
    isLoading.value = true;
    try {
      const username = localStorage.getItem('username');
      const params = { username };
      const response = await getFood(params);
      if (response.statusCode === 200 && Array.isArray(response.foodData)) {
        foods.value = (response.foodData as FoodApiCategory[]).flatMap((cat: FoodApiCategory) =>
          (cat.items || []).map((item: FoodApiItem) => ({
            id: item.id,
            foodName: item.name,
            category: cat.category,
            price: item.price,
            imgUrl: item.image,
            description: item.description,
            status: item.status ? 'active' : 'inactive',
            updatedAt: item.updatedAt,
          }))
        );
      } else {
        ElMessage.error(response.message || 'Failed to fetch foods.');
      }
    } catch (error) {
      console.error('Fetch foods error:', error);
      ElMessage.error('Failed to fetch foods.');
    } finally {
      isLoading.value = false;
    }
  };

  // Create food
  const createFood = async () => {
    try {
      isLoading.value = true;
      const payload = {
        foodName: foodForm.value.foodName,
        description: foodForm.value.description,
        price: foodForm.value.price !== null ? Number(foodForm.value.price) : null,
        category: foodForm.value.category,
        imgUrl: foodForm.value.imgUrl,
        status: foodForm.value.status,
      };
      const response = await apiCreateFood(payload);
      if (response.statusCode === 200) {
        ElMessage.success(response.message || 'Food created successfully!');
        await fetchFoods();
      } else {
        ElMessage.error(response.message || 'Failed to create food.');
      }
    } catch (error) {
      console.error('Create food error:', error);
      ElMessage.error('Failed to create food.');
    } finally {
      isLoading.value = false;
    }
  };

  // Update food
  const updateFood = async (food: FoodItem) => {
    try {
      isLoading.value = true;
      const payload = {
        foodId: food.id,
        foodName: food.foodName,
        description: food.description,
        price: food.price,
        category: food.category,
        imgUrl: food.imgUrl,
        status: food.status === 'active',
      };
      const response = await apiUpdateFood(payload);
      if (response.statusCode === 200) {
        ElMessage.success(response.message || 'Food updated successfully!');
        await fetchFoods();
      } else {
        ElMessage.error(response.message || 'Failed to update food.');
      }
    } catch (error) {
      console.error('Update food error:', error);
      ElMessage.error('Failed to update food.');
    } finally {
      isLoading.value = false;
    }
  };

  // Delete food
  const deleteFood = async (foodId: string) => {
    try {
      isLoading.value = true;
      const response = await apiDeleteFood({ foodId });
      if (response.statusCode === 200) {
        ElMessage.success(response.message || 'Food deleted successfully!');
        await fetchFoods();
      } else {
        ElMessage.error(response.message || 'Failed to delete food.');
      }
    } catch (error) {
      console.error('Delete food error:', error);
      ElMessage.error('Failed to delete food.');
    } finally {
      isLoading.value = false;
    }
  };

  // Form handlers for UI
  const handleCreateFood = async () => {
    if (!foodFormRef.value) return;
    try {
      await foodFormRef.value.validate();
      await createFood();
    } catch {
      return;
    }
  };

  const handleUpdateFood = async (food: FoodItem) => {
    if (!foodFormRef.value) return;
    try {
      await foodFormRef.value.validate();
      await updateFood(food);
    } catch {
      return;
    }
  };

  const handleDeleteFood = async (foodId: string) => {
    await deleteFood(foodId);
  };

  return {
    foods,
    fetchFoods,
    handleCreateFood,
    handleUpdateFood,
    handleDeleteFood,
    foodForm,
    foodFormRef,
    rules,
    isLoading,
  };
};
