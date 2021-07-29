import { ref, Ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

const BASE_TITLE = 'Anda akan menghapus data';
const BASE_MESSAGE = 'Menghapus data pada satu tabel akan mempengaruhi data pada tabel yang lain. Lakukan dengan hati - hati!';

export interface RemoveLoading {
  type: 'loading';
}

export interface RemoveResult {
  type: 'result';
}

export interface RemoveError {
  type: 'error';
  error: any;
}

export interface RemoveIdle {
  type: 'idle';
}

export type Result = RemoveError | RemoveLoading | RemoveResult | RemoveIdle;

export function useRemoveEntity(entityName: string) {
  const result: Ref<Result> = ref({ type: 'idle' } as RemoveIdle)
  const $q = useQuasar();

  const remove = async (url: string) => {
    result.value = { type: 'loading' };
    try {
      await api.delete(url);
      result.value = { type: 'result' };
    } catch (err) {
      console.log(err);
      result.value = { type: 'error', error: err };
    }
  };

  const promptRemove = (url: string, label: any) => {
    const promptResult = new Promise((resolve, reject) => {
      $q.dialog({
        title: `${BASE_TITLE} ${entityName} #${label}?`,
        message: BASE_MESSAGE,
        ok: 'lanjutkan',
        cancel: 'batalkan'
      })
        .onOk(() => {
          remove(url);
          resolve(true);
        })
        .onDismiss(() => {
          reject(false);
        });
    });
    return promptResult;
  };

  return {
    result,
    remove,
    promptRemove,
  }
}
