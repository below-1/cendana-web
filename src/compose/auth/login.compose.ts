import { ref, Ref } from 'vue';
import { api } from 'boot/axios';
import { User } from 'src/models/user.model';

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export function useLogin() {
  const loading = ref(false);
  const error: Ref<string | null> = ref(null);

  async function doLogin(payload: LoginPayload): Promise<void> {
    loading.value = true;
    try {
      const response = await api.post<LoginResponse>('/auth/login', payload);
      error.value = null;
      const { data } = response;
      localStorage.setItem('token', data.token);
    } catch (err) {
      console.log(err);
      error.value = 'Terjadi kesalahan';
    } finally {
      loading.value = false;
    }
  }
  return {
    loading,
    error,
    doLogin,
  };
}