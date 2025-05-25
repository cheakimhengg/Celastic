import { ref } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import {
  getCategory,
  createCategory as apiCreateCategory,
  updateCategory as apiUpdateCategory,
  deleteCategory as apiDeleteCategory,
} from './apiCalling';
import type { Category } from '@/models/food';

export const useCategory = () => {
  const isLoading = ref(false);
  const categoryForm = ref({
    name: '',
    status: true,
    createdAt: '',
    modifiedAt: '',
  });
  const categoryFormRef = ref<FormInstance>();
  const rules = ref<FormRules>({
    name: [
      { required: true, message: 'Category name is required', trigger: 'blur' },
      { min: 2, message: 'Category name must be at least 2 characters', trigger: 'blur' },
    ],
    status: [{ required: true, message: 'Status is required', trigger: 'change' }],
  });
  const categories = ref<Category[]>([]);

  // Fetch all categories
  const fetchCategories = async () => {
    isLoading.value = true;
    try {
      const webId = localStorage.getItem('webID');
      const params = { webId };
      const response = await getCategory(params);
      if (response.statusCode === 200 && Array.isArray(response.categories)) {
        categories.value = response.categories.map((cat: Category) => ({
          id: String(cat._id),
          name: String(cat.categoryName),
          status: Boolean(cat.status),
          createdAt: String(cat.createdAt),
          modifiedAt: String(cat.updatedAt),
        })) as Category[];
      } else {
        ElMessage.error(response.message || 'Failed to fetch categories.');
      }
    } catch (error) {
      console.error('Fetch categories error:', error);
      ElMessage.error('Failed to fetch categories.');
    } finally {
      isLoading.value = false;
    }
  };

  // Create category
  const createCategory = async () => {
    try {
      isLoading.value = true;
      const payload = {
        categoryName: categoryForm.value.name,
        status: categoryForm.value.status,
      };
      const response = await apiCreateCategory(payload);
      if (response.statusCode === 200) {
        ElMessage.success(response.message || 'Category created successfully!');
        await fetchCategories();
      } else {
        ElMessage.error(response.message || 'Failed to create category.');
      }
    } catch (error) {
      console.error('Create category error:', error);
      ElMessage.error('Failed to create category.');
    } finally {
      isLoading.value = false;
    }
  };

  // Update category
  const updateCategory = async (category: Category) => {
    try {
      isLoading.value = true;
      const payload = {
        categoryId: category.id,
        name: category.name,
        status: category.status,
      };
      const response = await apiUpdateCategory(payload);
      if (response.statusCode === 200) {
        ElMessage.success(response.message || 'Category updated successfully!');
        await fetchCategories();
      } else {
        ElMessage.error(response.message || 'Failed to update category.');
      }
    } catch (error) {
      console.error('Update category error:', error);
      ElMessage.error('Failed to update category.');
    } finally {
      isLoading.value = false;
    }
  };

  // Delete category
  const deleteCategory = async (categoryId: string) => {
    try {
      isLoading.value = true;
      const response = await apiDeleteCategory({ categoryId });
      if (response.statusCode === 200) {
        ElMessage.success(response.message || 'Category deleted successfully!');
        await fetchCategories();
      } else {
        ElMessage.error(response.message || 'Failed to delete category.');
      }
    } catch (error) {
      console.error('Delete category error:', error);
      ElMessage.error('Failed to delete category.');
    } finally {
      isLoading.value = false;
    }
  };

  // Form handlers for UI
  const handleCreateCategory = async () => {
    if (!categoryFormRef.value) return;
    try {
      await categoryFormRef.value.validate();
      await createCategory();
    } catch {
      return;
    }
  };

  const handleUpdateCategory = async (category: Category) => {
    if (!categoryFormRef.value) return;
    try {
      await categoryFormRef.value.validate();
      await updateCategory(category);
    } catch {
      return;
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    await deleteCategory(categoryId);
  };

  return {
    categories,
    fetchCategories,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    categoryForm,
    categoryFormRef,
    rules,
    isLoading,
  };
};
