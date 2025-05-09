<template>
    <div class="min-h-screen w-full bg-[#f6f8fb]">
        <div class="w-full px-4 md:px-8 pt-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <h2 class="text-3xl font-bold text-gray-900">Categories</h2>
            </div>
            <div
                class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 border-b border-gray-200 pb-4">
                <el-input v-model="search" placeholder="Search categories..." clearable
                    class="w-full md:w-64 rounded-lg border border-gray-200" />
                <el-button type="primary" @click="openAddModal" class="self-end md:self-auto">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    Add Category
                </el-button>
            </div>
            <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-x-auto w-full">
                <el-table :data="filteredCategories" stripe border
                    class="w-full custom-table modern-table min-w-[700px]" :row-class-name="() => 'custom-row'">
                    <el-table-column prop="name" label="Name" min-width="180" header-class-name="custom-header" />
                    <el-table-column prop="createdAt" label="Created At" min-width="140"
                        header-class-name="custom-header" />
                    <el-table-column prop="modifiedAt" label="Modified At" min-width="140"
                        header-class-name="custom-header" />
                    <el-table-column prop="status" label="Status" min-width="100" header-class-name="custom-header">
                        <template #default="{ row }">
                            <el-switch v-model="row.status" />
                        </template>
                    </el-table-column>
                    <el-table-column label="Actions" min-width="100" header-class-name="custom-header">
                        <template #default="{ row }">
                            <el-button size="small" type="primary" circle plain @click="openEditModal(row)"
                                class="mr-1">
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
                <div v-if="!filteredCategories.length"
                    class="text-center text-gray-400 py-12 text-lg bg-white rounded-b-2xl">No
                    categories found.</div>
            </div>
        </div>

        <!-- Add/Edit Dialog -->
        <el-dialog :model-value="showModal" @close="closeModal" :title="isEdit ? 'Edit Category' : 'Add Category'"
            width="400px" center>
            <el-form @submit.prevent="isEdit ? updateCategory() : addCategory()" :model="modalCategoryObj"
                label-width="120px">
                <el-form-item label="Category Name" :error="modalError">
                    <el-input v-model="modalCategoryObj.name" placeholder="e.g. Pizza, Drinks, Dessert" />
                </el-form-item>
                <el-form-item label="Status">
                    <el-switch v-model="modalCategoryObj.status" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="isEdit ? updateCategory() : addCategory()">{{ isEdit ? 'Update' :
                        'Add'
                    }}</el-button>
                    <el-button @click="closeModal">Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- Delete Confirmation Dialog -->
        <el-dialog :model-value="showDeleteModal" @close="closeDeleteModal" title="Delete Category" width="350px"
            center>
            <div class="mb-6 text-gray-700">Are you sure you want to delete <span class="font-semibold">{{
                deleteTarget?.name
                    }}</span>?</div>
            <template #footer>
                <el-button type="danger" @click="confirmDelete">Delete</el-button>
                <el-button @click="closeDeleteModal">Cancel</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'

interface Category {
    name: string
    status: boolean
    createdAt: string
    modifiedAt: string
}

const categories = ref<Category[]>([
    { name: 'Pizza', status: true, createdAt: '2024-06-01', modifiedAt: '2024-06-05' },
    { name: 'Drinks', status: true, createdAt: '2024-06-02', modifiedAt: '2024-06-06' },
    { name: 'Dessert', status: false, createdAt: '2024-06-03', modifiedAt: '2024-06-07' },
])

const search = ref('')
const filteredCategories = computed(() => {
    if (!search.value) return categories.value
    return categories.value.filter(cat =>
        cat.name.toLowerCase().includes(search.value.toLowerCase())
    )
})

// Modal state
const showModal = ref(false)
const isEdit = ref(false)
const modalCategoryObj = ref<Category>({ name: '', status: true, createdAt: '', modifiedAt: '' })
const modalError = ref('')
let editTarget: Category | null = null

// Delete modal state
const showDeleteModal = ref(false)
const deleteTarget = ref<Category | null>(null)

function openAddModal() {
    isEdit.value = false
    modalCategoryObj.value = { name: '', status: true, createdAt: '', modifiedAt: '' }
    modalError.value = ''
    showModal.value = true
}
function openEditModal(cat: Category) {
    isEdit.value = true
    modalCategoryObj.value = { ...cat }
    modalError.value = ''
    editTarget = cat
    showModal.value = true
}
function closeModal() {
    showModal.value = false
}
function addCategory() {
    modalError.value = ''
    const name = modalCategoryObj.value.name.trim()
    if (!name) {
        modalError.value = 'Category name is required.'
        return
    }
    if (categories.value.some(c => c.name === name)) {
        modalError.value = 'Category already exists.'
        return
    }
    const now = new Date().toISOString().slice(0, 10)
    categories.value.push({
        ...modalCategoryObj.value,
        createdAt: now,
        modifiedAt: now,
    })
    showModal.value = false
    ElMessage.success('Category added!')
}
function updateCategory() {
    modalError.value = ''
    const name = modalCategoryObj.value.name.trim()
    if (!name) {
        modalError.value = 'Category name is required.'
        return
    }
    if (categories.value.some(c => c.name === name && c !== editTarget)) {
        modalError.value = 'Category already exists.'
        return
    }
    if (editTarget) {
        Object.assign(editTarget, { ...modalCategoryObj.value, modifiedAt: new Date().toISOString().slice(0, 10) })
    }
    showModal.value = false
    ElMessage.success('Category updated!')
}
function openDeleteModal(cat: Category) {
    deleteTarget.value = cat
    showDeleteModal.value = true
}
function closeDeleteModal() {
    showDeleteModal.value = false
}
function confirmDelete() {
    if (deleteTarget.value) {
        categories.value = categories.value.filter(c => c !== deleteTarget.value)
        showDeleteModal.value = false
        ElMessage.success('Category deleted!')
    }
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
