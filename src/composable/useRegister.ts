import { ref } from 'vue';
import { getRegister } from './apiCalling';
import type { FormInstance, FormRules } from 'element-plus';

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
      { required: true, message: 'Required', trigger: 'blur' },
      { type: 'email', message: 'Please enter a valid email', trigger: 'blur' },
    ],
    username: [{ required: true, message: 'Required', trigger: 'blur' }],
    password: [{ required: true, message: 'Required', trigger: 'blur' }],
    confirmPassword: [
      { required: true, message: 'Required', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (value !== registerForm.value.password) {
            callback(new Error('Passwords do not match'));
          } else {
            callback();
          }
        },
        trigger: 'blur',
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
      console.log('Login response:', response);
    } catch (error) {
      console.error('Error fetching food data:', error);
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
