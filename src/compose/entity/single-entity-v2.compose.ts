import { 
  ref, 
  isRef,
  unref,
  Ref 
} from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'boot/axios';

const FAILURE_MESSAGE = 'Gagal mengambil data';

interface SingleResult<T> {
  type: 'result';
  data: T;
}

interface SingleError {
  type: 'error';
  error: Error;
}

interface SingleLoading {
  type: 'loading';
}

interface Options {
  entityName: string;
  url: string | Ref<string>
}

export function useSingleEntityV2<T>(options: Options) {
  const { 
    entityName
  } = options
  type Result = SingleResult<T> | SingleLoading | SingleError;

  const result: Ref<Result> = ref({ type: 'loading' } as SingleLoading);
  const $q = useQuasar();

  async function getSingleEntity() {
    const url = isRef(options.url) ? unref(options.url) : options.url
    result.value = { type: 'loading' };
    try {
      const response = await api.get<T>(url);
      const { data } = response;
      result.value = { type: 'result', data };
      return data;
    } catch (err) {
      console.log(err);
      $q.notify({
        type: 'negative',
        message: `${FAILURE_MESSAGE} ${entityName}`,
        closeBtn: true
      });
      result.value = { type: 'error', error: err };
    }
  }

  return {
    result,
    getSingleEntity
  };
}
