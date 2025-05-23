<template>
  <div class="w-full min-h-screen bg-[#fafbfc] p-6 md:p-10" v-loading="isLoading">
    <!-- Header Row -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <h1 class="text-2xl font-bold text-gray-900">Category Management</h1>
      <div class="flex items-center gap-3 w-full md:w-auto">
        <el-input v-model="search" placeholder="Search categories by name" class="w-full md:w-72" clearable>
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
        <el-button type="primary" @click="openAddModal" class="rounded-xl">
          <el-icon>
            <Plus />
          </el-icon>
          <span class="ml-1">Add Category</span>
        </el-button>
      </div>
    </div>

    <!-- Filter Dropdown -->
    <el-card v-if="showFilter" class="mb-6 p-4 max-w-xl">
      <div class="flex flex-col md:flex-row gap-4 items-center">
        <el-select v-model="filterStatus" placeholder="Status" clearable class="w-full md:w-48">
          <el-option label="Active" :value="true" />
          <el-option label="Inactive" :value="false" />
        </el-select>
        <el-button @click="resetFilters" class="ml-auto">Reset</el-button>
      </div>
    </el-card>

    <el-card class="p-0">
      <el-table :data="filteredCategories" stripe class="w-full" height="auto" :loading="isLoading">
        <el-table-column prop="name" label="Name" min-width="180" />
        <el-table-column prop="createdAt" label="Created At" min-width="140" />
        <el-table-column prop="modifiedAt" label="Modified At" min-width="140" />
        <el-table-column prop="status" label="Status" min-width="100">
          <template #default="{ row }">
            <el-switch v-model="row.status" />
          </template>
        </el-table-column>
        <el-table-column label="Actions" min-width="100">
          <template #default="{ row }">
            <el-button size="small" type="primary" circle plain @click="openEditModal(row)" class="mr-1">
              <el-icon>
                <Edit />
              </el-icon>
            </el-button>
            <el-button size="small" type="danger" circle plain @click="openDeleteModal(row)">
              <el-icon>
                <Delete />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Add/Edit Category Dialog -->
    <el-dialog v-model="dialogVisible" :title="dialogMode === 'add' ? 'Add Category' : 'Edit Category'" width="420px"
      class="rounded-2xl" @close="closeDialog">
      <el-form :model="modalCategoryObj" :rules="rules" ref="categoryFormRef" label-width="120px"
        class="space-y-4 px-2 pt-2 pb-0" label-position="left">
        <el-form-item label="Category Name" prop="name">
          <el-input v-model="modalCategoryObj.name" placeholder="e.g. Pizza, Drinks, Dessert" clearable />
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select v-model="modalCategoryObj.status" placeholder="Select status" clearable>
            <el-option label="Active" :value="true" />
            <el-option label="Inactive" :value="false" />
          </el-select>
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

    <!-- Delete Confirmation Dialog -->
    <el-dialog :model-value="showDeleteModal" @close="closeDeleteModal" title="Delete Category" width="350px" center>
      <div class="mb-6 text-gray-700">Are you sure you want to delete <span class="font-semibold">{{
        deleteTarget?.name
          }}</span>?</div>
      <template #footer>
        <el-button type="danger" :loading="isLoading" @click="confirmDelete">Delete</el-button>
        <el-button @click="closeDeleteModal">Cancel</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { Plus, Edit, Delete, Search, Filter } from '@element-plus/icons-vue'
import { useCategory } from '@/composable/useCategory'
import type { Category } from '@/models/food'

const search = ref('')
const dialogVisible = ref(false)
const dialogMode = ref<'add' | 'edit'>('add')
const showDeleteModal = ref(false)
const deleteTarget = ref<Category | null>(null)
const showFilter = ref(false)
const filterStatus = ref('')
let editTarget: Category | null = null

// Use composable
const {
  categories,
  fetchCategories,
  handleCreateCategory,
  handleUpdateCategory,
  handleDeleteCategory,
  categoryForm,
  categoryFormRef,
  rules,
  isLoading,
} = useCategory()

const filteredCategories = computed(() => {
  let cats = categories.value
  if (search.value) {
    cats = cats.filter(cat => cat.name.toLowerCase().includes(search.value.toLowerCase()))
  }
  if (filterStatus.value !== '') {
    cats = cats.filter(cat => String(cat.status) === filterStatus.value)
  }
  return cats
})

const modalCategoryObj = ref<Category>({ name: '', status: true, createdAt: '', modifiedAt: '', id: '' })

onMounted(() => {
  fetchCategories()
})

function openAddModal() {
  dialogMode.value = 'add'
  modalCategoryObj.value = { name: '', status: true, createdAt: '', modifiedAt: '', id: '' }
  if (categoryFormRef.value) categoryFormRef.value.clearValidate()
  dialogVisible.value = true
}
function openEditModal(cat: Category) {
  dialogMode.value = 'edit'
  modalCategoryObj.value = { ...cat }
  if (categoryFormRef.value) categoryFormRef.value.clearValidate()
  editTarget = cat
  dialogVisible.value = true
}
function closeDialog() {
  dialogVisible.value = false
  if (categoryFormRef.value) categoryFormRef.value.clearValidate()
}
async function onSubmit() {
  if (!categoryFormRef.value) return
  await nextTick()
  await categoryFormRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    if (dialogMode.value === 'add') {
      categoryForm.value = { ...modalCategoryObj.value }
      await handleCreateCategory()
      dialogVisible.value = false
    } else if (editTarget) {
      await handleUpdateCategory({ ...modalCategoryObj.value, id: editTarget.id })
      dialogVisible.value = false
    }
  })
}
async function openDeleteModal(cat: Category) {
  deleteTarget.value = cat
  showDeleteModal.value = true
}
async function closeDeleteModal() {
  showDeleteModal.value = false
}
async function confirmDelete() {
  if (deleteTarget.value) {
    await handleDeleteCategory(deleteTarget.value.id)
    showDeleteModal.value = false
  }
}

function resetFilters() {
  filterStatus.value = ''
  search.value = ''
}
</script>

<style scoped>
.custom-table>>>.el-table__header th.custom-header {
  background: #f6f8fb;
  font-weight: 700;
  color: #222;
  font-size: 1rem;
  padding-top: 18px;
  padding-bottom: 18px;
}

.custom-table>>>.el-table__row {
  transition: background 0.2s, box-shadow 0.2s;
  font-size: 1.05rem;
  border-bottom: 1px solid #f0f4fa;
}

.custom-table>>>.el-table__row:hover {
  background: #f0f4fa;
  box-shadow: 0 2px 8px 0 rgba(64, 158, 255, 0.04);
}

.modern-table {
  font-size: 1.05rem;
}

@media (max-width: 768px) {
  .modern-table {
    font-size: 0.98rem;
  }
}
</style>
