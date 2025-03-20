import { ref } from 'vue';
import { getLogin } from './apiCalling';
import type { FormInstance, FormRules } from 'element-plus';

export const useLogin = () => {
  const isLoading = ref(false);
  const loginForm = ref({
    username: '',
    password: '',
  });

  const loginFormRef = ref<FormInstance>();
  const rules = ref<FormRules>({
    username: [{ required: true, message: 'Required', trigger: 'blur' }],
    password: [{ required: true, message: 'Required', trigger: 'blur' }],
  });

  const handleLogin = async () => {
    if (!loginFormRef.value) return;
    await loginFormRef.value.validate((valid) => {
      if (valid) {
        login();
      }
    });
  };

  const login = async () => {
    try {
      isLoading.value = true;
      const params = {
        name: loginForm.value.username,
        password: loginForm.value.password,
      };
      const response = await getLogin(params);
      console.log('Login response:', response);
    } catch (error) {
      console.error('Error fetching food data:', error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    loginForm,
    handleLogin,
    loginFormRef,
    rules,
  };
};
