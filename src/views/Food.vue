<template>
  <div class="w-full min-h-screen bg-[#fafbfc] p-6 md:p-10" v-loading="isLoading">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <h1 class="text-2xl font-bold text-gray-900">Food Management</h1>
      <div class="flex items-center gap-3 w-full md:w-auto">
        <el-input v-model="search" placeholder="Search food by name or category" class="w-full md:w-72" clearable>
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-input>
        <el-button @click="showFilter = !showFilter"
          class="bg-white border border-gray-200 hover:bg-gray-50 transition">
          <el-icon>
            <Filter />
          </el-icon>
          <span class="ml-1">Filter</span>
        </el-button>
        <el-button type="primary" @click="openAddDialog" class="rounded-xl">
          <el-icon>
            <Plus />
          </el-icon>
          <span class="ml-1">Add Food</span>
        </el-button>
      </div>
    </div>

    <!-- Filter Dropdown (optional, simple) -->
    <el-card v-if="showFilter" class="mb-6 p-4 max-w-xl">
      <div class="flex flex-col md:flex-row gap-4 items-center">
        <el-select v-model="filterCategory" placeholder="Category" clearable class="w-full md:w-48">
          <el-option v-for="cat in categories" :key="cat" :label="cat" :value="cat" />
        </el-select>
        <el-select v-model="filterStatus" placeholder="Status" clearable class="w-full md:w-48">
          <el-option label="Active" value="active" />
          <el-option label="Inactive" value="inactive" />
        </el-select>
        <el-button @click="resetFilters" class="ml-auto">Reset</el-button>
      </div>
    </el-card>

    <!-- Food Table -->
    <el-card class="p-0">
      <el-table :data="filteredFoods" stripe class="w-full" height="auto">
        <el-table-column label="Image" width="80">
          <template #default="{ row }">
            <img :src="row.imgUrl" alt="food" class="w-12 h-12 object-cover rounded-lg border" />
          </template>
        </el-table-column>
        <el-table-column prop="foodName" label="Name" min-width="120" />
        <el-table-column prop="category" label="Category" min-width="100" />
        <el-table-column prop="price" label="Price" min-width="80">
          <template #default="{ row }">
            ${{ row.price.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" min-width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status === 'active' ? 'Active' : 'Inactive' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="Updated" min-width="120">
          <template #default="{ row }">
            {{ new Date(row.updatedAt).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="120">
          <template #default="{ row }">
            <el-button size="small" @click="editFood(row)" circle><el-icon>
                <Edit />
              </el-icon></el-button>
            <el-button size="small" type="danger" @click="deleteFood(row)" circle><el-icon>
                <Delete />
              </el-icon></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Add/Edit Food Dialog -->
    <el-dialog v-model="dialogVisible" :title="dialogMode === 'add' ? 'Add Food' : 'Edit Food'" width="420px"
      class="rounded-2xl" @close="closeDialog">
      <el-form :model="foodForm" :rules="rules" ref="foodFormRef" label-width="100px" class="space-y-4 px-2 pt-2 pb-0"
        label-position="left">
        <el-form-item label="Name" prop="foodName">
          <el-input v-model="foodForm.foodName" placeholder="Enter food name" clearable />
        </el-form-item>
        <el-form-item label="Category" prop="category">
          <el-select v-model="foodForm.category" placeholder="Select category" clearable>
            <el-option v-for="cat in categories" :key="cat" :label="cat" :value="cat" />
          </el-select>
        </el-form-item>
        <el-form-item label="Price" prop="price">
          <el-input v-model.number="foodForm.price" type="number" min="0" placeholder="Enter price" clearable />
        </el-form-item>
        <el-form-item label="Image" prop="imgUrl">
          <el-input v-model="foodForm.imgUrl" placeholder="Paste image URL" clearable />
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select v-model="foodForm.status" placeholder="Select status" clearable>
            <el-option label="Active" :value="true" />
            <el-option label="Inactive" :value="false" />
          </el-select>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="foodForm.description" type="textarea" placeholder="Enter description" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex justify-end items-center px-2 pb-2 gap-2">
          <el-button @click="closeDialog" class="rounded-lg">Cancel</el-button>
          <el-button type="primary" @click="onSubmit" :loading="isLoading" :disabled="isLoading"
            class="rounded-lg px-6">Save</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { Search, Filter, Plus, Edit, Delete } from '@element-plus/icons-vue';
import { useFood } from '@/composable/useFood';
import type { FoodItem } from '@/models/food';

const categories = ref(['Pizza', 'Burger', 'Salad', 'Dessert', 'Drink']);

const {
  foods,
  fetchFoods,
  handleCreateFood,
  handleDeleteFood,
  handleUpdateFood,
  foodForm,
  foodFormRef,
  rules,
  isLoading
} = useFood();

const search = ref('');
const showFilter = ref(false);
const filterCategory = ref('');
const filterStatus = ref('');
const dialogVisible = ref(false);
const dialogMode = ref<'add' | 'edit'>('add');
const editFoodId = ref<string | null>(null);
const formSubmitAttempted = ref(false);

const filteredFoods = computed(() => foods.value.filter((f: FoodItem) => {
  const matchesSearch =
    f.foodName.toLowerCase().includes(search.value.toLowerCase()) ||
    f.category.toLowerCase().includes(search.value.toLowerCase());
  const matchesCategory = !filterCategory.value || f.category === filterCategory.value;
  const matchesStatus = !filterStatus.value || f.status === filterStatus.value;
  return matchesSearch && matchesCategory && matchesStatus;
}));

function openAddDialog() {
  dialogMode.value = 'add';
  resetFoodForm();
  dialogVisible.value = true;
  formSubmitAttempted.value = false;
}

function editFood(row: FoodItem) {
  dialogMode.value = 'edit';
  setFoodForm(row);
  editFoodId.value = row.id;
  dialogVisible.value = true;
  formSubmitAttempted.value = false;
}

function closeDialog() {
  dialogVisible.value = false;
  formSubmitAttempted.value = false;
  foodFormRef.value?.clearValidate();
}

function resetFoodForm() {
  foodForm.value = {
    foodName: '',
    description: '',
    price: 0,
    category: '',
    imgUrl: '',
    status: true,
  };
}
function setFoodForm(row: FoodItem) {
  foodForm.value = {
    foodName: row.foodName,
    description: row.description,
    price: row.price,
    category: row.category,
    imgUrl: row.imgUrl,
    status: row.status === 'active',
  };
}

async function onSubmit() {
  formSubmitAttempted.value = true;
  await nextTick();
  await foodFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) return;
    if (dialogMode.value === 'add') {
      await handleCreateFood();
      await fetchFoods();
      closeDialog();
    } else if (editFoodId.value) {
      await handleUpdateFood({
        id: editFoodId.value,
        foodName: foodForm.value.foodName,
        description: foodForm.value.description,
        price: foodForm.value.price,
        category: foodForm.value.category,
        imgUrl: foodForm.value.imgUrl,
        status: foodForm.value.status ? 'active' : 'inactive',
        updatedAt: new Date().toISOString(),
      });
      closeDialog();
    }
  });
}

async function deleteFood(row: FoodItem) {
  await handleDeleteFood(row.id);
}

function resetFilters() {
  filterCategory.value = '';
  filterStatus.value = '';
}

onMounted(fetchFoods);
</script>
