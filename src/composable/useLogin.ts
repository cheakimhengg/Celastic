import { ref } from 'vue';
import { getLogin } from './apiCalling';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';

export const useLogin = () => {
  const isLoading = ref(false);
  const loginForm = ref({
    username: '',
    password: '',
  });

  const loginFormRef = ref<FormInstance>();
  const rules = ref<FormRules>({
    username: [
      { required: true, message: 'Username is required', trigger: 'blur' },
      { min: 3, message: 'Username must be at least 3 characters', trigger: 'blur' },
      { max: 20, message: 'Username cannot exceed 20 characters', trigger: 'blur' },
      {
        pattern: /^[a-zA-Z0-9_]+$/,
        message: 'Username can only contain letters, numbers and underscore',
        trigger: 'blur',
      },
    ],
    password: [
      { required: true, message: 'Password is required', trigger: 'blur' },
      { min: 8, message: 'Password must be at least 8 characters', trigger: 'blur' },
      {
        pattern: /^(?=.*[a-zA-Z])[a-zA-Z\d@$!%*?&]+$/,
        message: 'Password must contain at least one letter',
        trigger: 'blur',
      },
    ],
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
        username: loginForm.value.username,
        password: loginForm.value.password,
      };
      const response = await getLogin(params);
      if (response.statusCode === 200) {
        ElMessage.success(response.message);
        window.location.href = '/admin/dashboard';
      } else {
        ElMessage.error(response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      ElMessage.error('Invalid username or password. Please try again.');
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
