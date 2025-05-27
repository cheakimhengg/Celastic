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
    status: '',
    people: 1,
  });
  const tableFormRef = ref<FormInstance>();
  const rules = ref<FormRules>({
    status: [{ required: true, message: 'Status is required', trigger: 'change' }],
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
        tables.value = response.tables.map((item: Record<string, unknown>) => ({
          id: item.tableId as string,
          name: item.tableId as string,
          status:
            typeof item.status === 'string' && item.status.toLowerCase() === 'vip'
              ? 'VIP'
              : 'Normal',
          people: item.people,
          createdAt: item.createdAt as string,
          _id: item._id as string,
        }));
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
        status: tableForm.value.status,
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
    tableId: string;
    status: 'VIP' | 'Normal';
    people: number;
  }) => {
    try {
      isLoading.value = true;
      const response = await apiUpdateTable(payload);
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
  const deleteTable = async (tableId: string) => {
    try {
      isLoading.value = true;
      const response = await apiDeleteTable({ tableId });
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
    tableId: string;
    status: 'VIP' | 'Normal';
    people: number;
  }) => {
    await updateTable(payload);
  };

  /**
   * Delete a table by its MongoDB _id (preferred) or fallback to id.
   * Accepts a row object with _id or id.
   */
  const handleDeleteTable = async (row: { _id?: string; id?: string }) => {
    const tableId = row._id || row.id;
    if (!tableId) {
      ElMessage.error('No table ID found for deletion.');
      return;
    }
    await deleteTable(tableId);
  };

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
  };
};
