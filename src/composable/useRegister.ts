import { ref } from 'vue';
import { getRegister } from './apiCalling';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';

export const useRegister = () => {
  const isLoading = ref(false);
  const registerForm = ref({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const registerFormRef = ref<FormInstance>();
  const rules = ref<FormRules>({
    email: [
      { required: true, message: 'Email is required', trigger: 'blur' },
      { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' },
      { max: 50, message: 'Email cannot exceed 50 characters', trigger: 'blur' },
      {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email format',
        trigger: 'blur',
      },
    ],
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
    confirmPassword: [
      { required: true, message: 'Please confirm your password', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (value !== registerForm.value.password) {
            callback(new Error('Passwords do not match'));
          } else {
            callback();
          }
        },
        trigger: ['blur', 'change'],
      },
    ],
  });

  const handleRegister = async () => {
    if (!registerFormRef.value) return;
    await registerFormRef.value.validate((valid) => {
      if (valid) {
        register();
      }
    });
  };

  const register = async () => {
    try {
      isLoading.value = true;
      const params = {
        email: registerForm.value.email,
        username: registerForm.value.username,
        password: registerForm.value.password,
      };
      const response = await getRegister(params);
      if (response.statusCode === 200) {
        // Store user info in localStorage
        if (response.user) {
          localStorage.setItem('token', response.user.token);
          localStorage.setItem('username', response.user.username);
          localStorage.setItem('webID', response.user.webID?.toString() || '');
        }
        ElMessage.success(response.message);
        window.location.href = '/admin/dashboard';
      } else {
        ElMessage.error(response.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      ElMessage.error('Registration failed. Please try again.');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    registerForm,
    handleRegister,
    registerFormRef,
    rules,
  };
};
