import { ref } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { getFood, createFood as apiCreateFood } from './apiCalling';

// Food item type for frontend
export interface FoodItem {
  id: string;
  foodName: string;
  description: string;
  price: number;
  category: string;
  imgUrl: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

// API response types
interface FoodApiItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  status: boolean;
  createdAt: string;
}
interface FoodApiCategory {
  id: number;
  category: string;
  items: FoodApiItem[];
}

export const useFood = () => {
  const isLoading = ref(false);
  // Form state
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
    description: [{ required: true, message: 'Description is required', trigger: 'blur' }],
    price: [
      { required: true, message: 'Price is required', trigger: 'blur' },
      { type: 'number', min: 0, message: 'Price must be positive', trigger: 'blur' },
    ],
    category: [{ required: true, message: 'Category is required', trigger: 'blur' }],
    imgUrl: [{ required: true, message: 'Image URL is required', trigger: 'blur' }],
  });

  // Foods list for frontend
  const foods = ref<FoodItem[]>([]);

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
      const payload = {
        foodName: foodForm.value.foodName,
        description: foodForm.value.description,
        price: foodForm.value.price !== null ? Number(foodForm.value.price) : null,
        category: foodForm.value.category,
        imgUrl: foodForm.value.imgUrl,
        status: foodForm.value.status,
        webId: localStorage.getItem('webID'),
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

  // Fetch foods from API and map to frontend format
  const fetchFoods = async () => {
    isLoading.value = true;
    try {
      const webId = localStorage.getItem('webID');
      const params = { webId };
      const response = await getFood(params);
      if (response.statusCode === 200 && Array.isArray(response.foodData)) {
        // Map backend data to frontend format
        const flatFoods: FoodItem[] = (response.foodData as FoodApiCategory[]).flatMap((cat) =>
          (cat.items || []).map((item) => ({
            id: item.id,
            foodName: item.name,
            category: cat.category,
            price: item.price,
            imgUrl: item.image,
            description: item.description,
            status: item.status ? 'active' : 'inactive',
            createdAt: item.createdAt,
          }))
        );
        foods.value = flatFoods;
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

  return {
    isLoading,
    foodForm,
    rules,
    handleCreateFood,
    foodFormRef,
    fetchFoods,
    foods,
  };
};
