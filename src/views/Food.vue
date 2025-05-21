<template>
  <div class="w-full min-h-screen bg-[#fafbfc] p-6 md:p-10">
    <!-- Header Row -->
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
        <el-table-column prop="createdAt" label="Created" min-width="120">
          <template #default="{ row }">
            {{ new Date(row.createdAt).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="120">
          <template #default="{ row }">
            <el-button size="small" @click="editFood(row)" circle><el-icon>
                <Edit />
              </el-icon></el-button>
            <el-button size="small" type="danger" @click="deleteFood(/* row: FoodItem */)" circle><el-icon>
                <Delete />
              </el-icon></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Add/Edit Food Dialog -->
    <el-dialog v-model="dialogVisible" :title="dialogMode === 'add' ? 'Add Food' : 'Edit Food'" width="400px"
      class="rounded-2xl">
      <el-form :model="apiFoodForm" :rules="rules" ref="foodFormRef" label-width="90px" class="space-y-2">
        <el-form-item label="Name">
          <el-input v-model="apiFoodForm.foodName" placeholder="Food name" />
        </el-form-item>
        <el-form-item label="Category">
          <el-select v-model="apiFoodForm.category" placeholder="Select category">
            <el-option v-for="cat in categories" :key="cat" :label="cat" :value="cat" />
          </el-select>
        </el-form-item>
        <el-form-item label="Price">
          <el-input v-model.number="apiFoodForm.price" type="number" min="0" placeholder="Price" />
        </el-form-item>
        <el-form-item label="Image">
          <el-input v-model="apiFoodForm.imgUrl" placeholder="Image URL" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="apiFoodForm.status" placeholder="Select status">
            <el-option label="Active" :value="true" />
            <el-option label="Inactive" :value="false" />
          </el-select>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="apiFoodForm.description" type="textarea" placeholder="Description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveFood">Save</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search, Filter, Plus, Edit, Delete } from '@element-plus/icons-vue';
import { useFood } from '@/composable/useFood';
import type { FoodItem } from '@/composable/useFood';

// Mock categories
const categories = ref(['Pizza', 'Burger', 'Salad', 'Dessert', 'Drink']);

const {
  foods,
  fetchFoods,
  handleCreateFood,
  foodForm: apiFoodForm,
  foodFormRef,
  rules
} = useFood();

onMounted(() => {
  fetchFoods();
});

// Search/filter state
const search = ref('');
const showFilter = ref(false);
const filterCategory = ref('');
const filterStatus = ref('');

// Dialog state
const dialogVisible = ref(false);
const dialogMode = ref<'add' | 'edit'>('add');

const filteredFoods = computed(() => {
  return foods.value.filter((f: FoodItem) => {
    const matchesSearch =
      f.foodName.toLowerCase().includes(search.value.toLowerCase()) ||
      f.category.toLowerCase().includes(search.value.toLowerCase());
    const matchesCategory = !filterCategory.value || f.category === filterCategory.value;
    const matchesStatus = !filterStatus.value || f.status === filterStatus.value;
    return matchesSearch && matchesCategory && matchesStatus;
  });
});

function openAddDialog() {
  dialogMode.value = 'add';
  apiFoodForm.value = {
    foodName: '',
    description: '',
    price: 0,
    category: '',
    imgUrl: '',
    status: true,
  };
  dialogVisible.value = true;
}

function editFood(row: FoodItem) {
  dialogMode.value = 'edit';
  apiFoodForm.value = {
    foodName: row.foodName,
    description: row.description,
    price: row.price,
    category: row.category,
    imgUrl: row.imgUrl,
    status: row.status === 'active',
  };
  dialogVisible.value = true;
}

async function saveFood() {
  if (dialogMode.value === 'add') {
    await handleCreateFood();
    await fetchFoods();
    dialogVisible.value = false;
    openAddDialog();
  } else {
    dialogVisible.value = false;
  }
}

function deleteFood(/* row: FoodItem */) {
  // Implement delete logic with API if needed
}

function resetFilters() {
  filterCategory.value = '';
  filterStatus.value = '';
}
</script>
