<template>
  <div v-loading="isLoading" class="w-full min-h-screen bg-[#fafbfc] p-6 md:p-10">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <h1 class="text-2xl font-bold text-gray-900">Table Management</h1>
      <div class="flex items-center gap-3 w-full md:w-auto">
        <el-button type="primary" @click="openAddDialog" class="rounded-xl">
          <span class="ml-1">Add Table</span>
        </el-button>
      </div>
    </div>
    <el-card class="p-0">
      <el-table :data="tables" stripe class="w-full" height="auto" :loading="isLoading">
        <el-table-column label="ID" width="80">
          <template #default="{ $index }">
            {{ $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" min-width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'VIP' ? 'warning' : 'info'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="people" label="People" min-width="80">
          <template #default="{ row }">
            {{ row.people }}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="Created At" min-width="160">
          <template #default="{ row }">
            {{ new Date(row.createdAt).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="120">
          <template #default="scope">
            <el-button size="small" type="primary" circle plain @click="openEditDialog(scope.row)" class="mr-1">
              <el-icon>
                <Edit />
              </el-icon>
            </el-button>
            <el-button type="danger" size="small" @click="handleDeleteTable(scope.row)" circle>
              <el-icon>
                <Delete />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Add/Edit Table Dialog -->
    <el-dialog v-model="dialogVisible" :title="dialogMode === 'add' ? 'Add Table' : 'Edit Table'" width="420px"
      class="rounded-2xl" @close="closeDialog">
      <el-form :model="tableForm" :rules="rules" ref="tableFormRef" label-width="120px" class="space-y-4 px-2 pt-2 pb-0"
        label-position="left">
        <el-form-item label="Status" prop="status">
          <el-select v-model="tableForm.status" placeholder="Select status">
            <el-option label="Normal" value="Normal" />
            <el-option label="VIP" value="VIP" />
          </el-select>
        </el-form-item>
        <el-form-item label="People" prop="people">
          <el-input-number v-model="tableForm.people" :min="1" :max="20" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex justify-end items-center px-2 pb-2 gap-2">
          <el-button @click="closeDialog" class="rounded-lg">Cancel</el-button>
          <el-button type="primary" @click="onSubmit" :loading="isLoading" :disabled="isLoading"
            class="rounded-lg px-6">{{ dialogMode === 'add' ? 'Create' : 'Save' }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';
import { useTable } from '@/composable/useTable';

const dialogVisible = ref(false);
const dialogMode = ref<'add' | 'edit'>('add');
const editTarget = ref<Record<string, unknown> | null>(null);

const {
  tables,
  fetchTables,
  handleCreateTable,
  handleUpdateTable,
  handleDeleteTable,
  tableForm,
  tableFormRef,
  rules,
  isLoading,
} = useTable();

function openAddDialog() {
  dialogMode.value = 'add';
  resetTableForm();
  dialogVisible.value = true;
  tableFormRef.value?.clearValidate();
}

function openEditDialog(row: Record<string, unknown>) {
  dialogMode.value = 'edit';
  setTableForm(row);
  editTarget.value = row;
  dialogVisible.value = true;
  tableFormRef.value?.clearValidate();
}

function closeDialog() {
  dialogVisible.value = false;
  tableFormRef.value?.clearValidate();
}

function resetTableForm() {
  tableForm.value.status = '';
  tableForm.value.people = 1;
}

function setTableForm(row: Record<string, unknown>) {
  tableForm.value.status = row.status as 'VIP' | 'Normal';
  tableForm.value.people = Number(row.people);
}

async function onSubmit() {
  await nextTick();
  await tableFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) return;
    if (dialogMode.value === 'add') {
      await handleCreateTable();
      dialogVisible.value = false;
    } else if (editTarget.value) {
      const tableId = (editTarget.value._id || editTarget.value.id) as string;
      await handleUpdateTable({
        tableId,
        status: tableForm.value.status as 'VIP' | 'Normal',
        people: tableForm.value.people,
      } as { tableId: string; status: 'VIP' | 'Normal'; people: number });
      dialogVisible.value = false;
    }
  });
}

onMounted(() => {
  fetchTables();
});
</script>

<style scoped>
.el-table th,
.el-table td {
  vertical-align: middle;
}
</style>
