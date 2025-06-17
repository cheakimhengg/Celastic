<template>
  <div v-loading="isLoading" class="w-full min-h-screen bg-[#fafbfc] p-6 md:p-10">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <h1 class="text-2xl font-bold text-gray-900">Table Management</h1>
      <div class="flex items-center gap-3 w-full md:w-auto">
        <el-input v-model="search" placeholder="Search by type or people" class="w-full md:w-72" clearable>
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
          <span class="ml-1">Add Table</span>
        </el-button>
      </div>
    </div>
    <el-card v-if="showFilter" class="mb-6 p-4 max-w-xl">
      <div class="flex flex-col md:flex-row gap-4 items-center w-full">
        <el-select v-model="filterStatus" placeholder="Status" clearable class="w-full md:w-48">
          <el-option label="Available" value="available" />
          <el-option label="Busy" value="busy" />
        </el-select>
        <el-select v-model="filterType" placeholder="Type" clearable class="w-full md:w-48">
          <el-option label="Normal" value="normal" />
          <el-option label="VIP" value="vip" />
          <el-option label="Exclusive" value="exclusive" />
        </el-select>
        <el-button @click="resetFilters" class="ml-auto">Reset</el-button>
      </div>
    </el-card>
    <el-card class="p-0">
      <el-table :data="filteredTables" stripe class="w-full" height="auto" :loading="isLoading">
        <el-table-column prop="tableId" label="Table ID" min-width="100" />
        <el-table-column prop="status" label="Status" min-width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'available' ? 'success' : 'danger'" effect="plain">
              {{ row.status === 'available' ? 'Available' : 'Busy' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="Type" min-width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === 'vip' ? 'warning' :
              row.type === 'exclusive' ? 'primary' :
                'info'" effect="dark">
              {{ row.type === 'vip' ? 'VIP' : row.type === 'exclusive' ? 'Exclusive' : 'Normal' }}
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
        <el-table-column label="Actions" width="140">
          <template #default="scope">
            <div class="flex items-center gap-2 justify-center">
              <el-button size="small" type="info" circle plain @click="openQrDialog(scope.row)">
                <el-icon>
                  <View />
                </el-icon>
              </el-button>
              <el-button size="small" type="primary" circle plain @click="openEditDialog(scope.row)">
                <el-icon>
                  <Edit />
                </el-icon>
              </el-button>
              <el-button size="small" type="danger" circle plain @click="handleDeleteTable(scope.row)">
                <el-icon>
                  <Delete />
                </el-icon>
              </el-button>
            </div>
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
            <el-option label="Available" value="available" />
            <el-option label="Busy" value="busy" />
          </el-select>
        </el-form-item>
        <el-form-item label="Type" prop="type">
          <el-select v-model="tableForm.type" placeholder="Select type">
            <el-option label="Normal" value="normal" />
            <el-option label="VIP" value="vip" />
            <el-option label="Exclusive" value="exclusive" />
          </el-select>
        </el-form-item>
        <el-form-item label="People" prop="people">
          <el-input-number v-model="tableForm.people" :min="1" :max="20" />
        </el-form-item>
        <el-form-item label="Table ID" prop="tableId">
          <el-input v-model="tableForm.tableId" placeholder="Enter table ID" clearable />
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

    <!-- QR Code Dialog -->
    <el-dialog v-model="qrDialogVisible" :title="`QR Code for Table ${qrTableName}`" width="350px">
      <div class="flex flex-col items-center gap-4">
        <qrcode-vue :value="qrUrl" :size="200" id="table-qr-canvas" class="mb-2" />
        <el-input v-model="qrUrl" readonly class="mb-2" />
        <div class="flex gap-2">
          <el-button @click="copyQrUrl" :icon="CopyDocument">Copy URL</el-button>
          <el-button @click="downloadQrCode" :icon="Download">Download QR</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue';
import { Edit, Delete, Search, Filter, View, CopyDocument, Download } from '@element-plus/icons-vue';
import { useTable } from '@/composable/useTable';
import type { Table } from '@/models/table';
import { ElMessage } from 'element-plus';
import QrcodeVue from 'qrcode.vue';

const search = ref('');
const showFilter = ref(false);
const filterStatus = ref('');
const filterType = ref('');

const dialogVisible = ref(false);
const dialogMode = ref<'add' | 'edit'>('add');
const editTarget = ref<Record<string, unknown> | null>(null);

// QR code dialog state
const qrDialogVisible = ref(false);
const qrUrl = ref('');
const qrTableId = ref('');
const qrTableName = ref('');
const username = localStorage.getItem('username') || '';

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
  resetTableForm,
  setTableForm,
} = useTable();

const filteredTables = computed(() => {
  return tables.value.filter((t: Table) => {
    const matchesSearch =
      !search.value ||
      (t.type && t.type.toLowerCase().includes(search.value.toLowerCase())) ||
      (t.people && String(t.people).includes(search.value));
    const matchesStatus = !filterStatus.value || t.status === filterStatus.value;
    const matchesType = !filterType.value || t.type === filterType.value;
    return matchesSearch && matchesStatus && matchesType;
  });
});

function resetFilters() {
  filterStatus.value = '';
  filterType.value = '';
  search.value = '';
}

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

async function onSubmit() {
  await nextTick();
  await tableFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) return;
    if (dialogMode.value === 'add') {
      await handleCreateTable();
      dialogVisible.value = false;
    } else if (editTarget.value) {
      const _id = (editTarget.value._id || editTarget.value.id) as string;
      await handleUpdateTable({
        _id,
        tableId: tableForm.value.tableId,
        status: tableForm.value.status as 'available' | 'busy',
        type: tableForm.value.type as 'normal' | 'vip' | 'exclusive',
        people: tableForm.value.people,
      } as { _id: string; tableId: string; status: 'available' | 'busy'; type: 'normal' | 'vip' | 'exclusive'; people: number });
      dialogVisible.value = false;
    }
  });
}

function openQrDialog(table: Table) {
  qrTableId.value = table._id;
  qrTableName.value = table.type === 'vip' ? 'VIP' : table.type === 'exclusive' ? 'Exclusive' : 'Normal';
  qrUrl.value = `https://nhamey-order.vercel.app/${username}/${table._id}`;
  qrDialogVisible.value = true;
}

function copyQrUrl() {
  navigator.clipboard.writeText(qrUrl.value);
  ElMessage.success('URL copied!');
}

function downloadQrCode() {
  const canvas = document.querySelector('#table-qr-canvas') as HTMLCanvasElement;
  if (canvas) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `table-${qrTableId.value}-qr.png`;
    link.click();
  }
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
