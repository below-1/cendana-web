import { ref, Ref } from 'vue';
import { api } from 'boot/axios';

interface CreateResult {
  type: 'result';
  data: any;
}

interface CreateError {
  type: 'error';
  error: Error;
}

interface CreateLoading {
  type: 'loading';
}

interface CreateIdle {
  type: 'idle';
}

export function useCreateEntity(entityName: string) {

  type Result = CreateResult | CreateLoading | CreateError | CreateIdle;
  const result: Ref<Result> = ref({ type: 'idle' } as CreateIdle);

  async function createEntity(url: string, payload: any) {
    result.value = { type: 'loading' };
    try {
      const response = await api.post(url, payload);
      const { data } = response;
      result.value = { type: 'result', data };
      return data;
    } catch (err) {
      console.log(err);
      alert(`Gagal menambah data ${entityName}`);
      result.value = { type: 'error', error: err };
    }
  }

  return {
    result,
    createEntity
  };
}
