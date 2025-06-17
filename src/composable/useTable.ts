import { ref } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import {
  getTable,
  createTable as apiCreateTable,
  deleteTable as apiDeleteTable,
  updateTable as apiUpdateTable,
} from './apiCalling';
import type { Table } from '@/models/table';

export const useTable = () => {
  // State
  const isLoading = ref(false);
  const tableForm = ref({
    tableId: '',
    status: '',
    type: '',
    people: 1,
  });
  const tableFormRef = ref<FormInstance>();
  const rules = ref<FormRules>({
    tableId: [
      { required: true, message: 'Table ID is required', trigger: 'blur' }
    ],
    status: [{ required: true, message: 'Status is required', trigger: 'change' }],
    type: [{ required: true, message: 'Type is required', trigger: 'change' }],
    people: [
      { required: true, message: 'People is required', trigger: 'blur' },
      { type: 'number', min: 1, message: 'People must be at least 1', trigger: 'blur' },
    ],
  });
  const tables = ref<Table[]>([]);

  // Fetch all tables
  const fetchTables = async () => {
    isLoading.value = true;
    try {
      const webId = localStorage.getItem('webID');
      const params = { webId };
      const response = await getTable(params);
      if (response.statusCode === 200 && Array.isArray(response.tables)) {
        tables.value = response.tables.map((item: Record<string, unknown>) => {
          let status = '';
          if (typeof item.status === 'string') {
            const s = item.status.toLowerCase();
            if (s.includes('avail')) status = 'available';
            else if (s.includes('busy')) status = 'busy';
          }
          return {
            tableId: String(item.tableId ?? ''),
            status,
            type: item.type as string,
            people: Number(item.people),
            createdAt: item.createdAt as string,
            _id: item._id as string,
          };
        });
      } else {
        ElMessage.error(response.message || 'Failed to fetch tables.');
      }
    } catch (error) {
      console.error('Fetch tables error:', error);
      ElMessage.error('Failed to fetch tables.');
    } finally {
      isLoading.value = false;
    }
  };

  // Create table
  const createTable = async () => {
    try {
      isLoading.value = true;
      const payload = {
        tableId: tableForm.value.tableId,
        status: tableForm.value.status,
        type: tableForm.value.type,
        people: tableForm.value.people,
      };
      const response = await apiCreateTable(payload);
      if (response.statusCode === 200) {
        ElMessage.success(response.message || 'Table created successfully!');
        await fetchTables();
      } else {
        ElMessage.error(response.message || 'Failed to create table.');
      }
    } catch (error) {
      console.error('Create table error:', error);
      ElMessage.error('Failed to create table.');
    } finally {
      isLoading.value = false;
    }
  };

  // Update table
  const updateTable = async (payload: {
    _id: string;
    tableId: string;
    status: string;
    type: string;
    people: number;
  }) => {
    try {
      isLoading.value = true;
      const updatePayload = {
        _id: payload._id,
        tableId: payload.tableId,
        status: payload.status,
        type: payload.type,
        people: payload.people,
      };
      const response = await apiUpdateTable(updatePayload);
      if (response.statusCode === 200) {
        ElMessage.success(response.message || 'Table updated successfully!');
        await fetchTables();
      } else {
        ElMessage.error(response.message || 'Failed to update table.');
      }
    } catch (error) {
      console.error('Update table error:', error);
      ElMessage.error('Failed to update table.');
    } finally {
      isLoading.value = false;
    }
  };

  // Delete table
  const deleteTable = async (_id: string) => {
    try {
      isLoading.value = true;
      const response = await apiDeleteTable({ _id });
      if (response.statusCode === 200) {
        ElMessage.success(response.message || 'Table deleted successfully!');
        await fetchTables();
      } else {
        ElMessage.error(response.message || 'Failed to delete table.');
      }
    } catch (error) {
      console.error('Delete table error:', error);
      ElMessage.error('Failed to delete table.');
    } finally {
      isLoading.value = false;
    }
  };

  // Form handlers for UI
  const handleCreateTable = async () => {
    if (!tableFormRef.value) return;
    try {
      await tableFormRef.value.validate();
      await createTable();
    } catch {
      return;
    }
  };

  const handleUpdateTable = async (payload: {
    _id: string;
    tableId: string;
    status: string;
    type: string;
    people: number;
  }) => {
    await updateTable(payload);
  };

  /**
   * Delete a table by its MongoDB _id (preferred) or fallback to id.
   * Accepts a row object with _id or id.
   */
  const handleDeleteTable = async (row: { _id?: string; id?: string }) => {
    const _id = row._id || row.id;
    if (!_id) {
      ElMessage.error('No table ID found for deletion.');
      return;
    }
    await deleteTable(_id);
  };

  function resetTableForm() {
    tableForm.value.tableId = '';
    tableForm.value.status = '';
    tableForm.value.type = '';
    tableForm.value.people = 1;
  }

  function setTableForm(row: Record<string, unknown>) {
    tableForm.value.tableId = String(row.tableId ?? '');
    tableForm.value.status = typeof row.status === 'string' ? row.status.toLowerCase() : '';
    tableForm.value.type = row.type as string;
    tableForm.value.people = Number(row.people);
  }

  return {
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
  };
};
