<template>
  <q-page>
    <q-toolbar class="text-grey-8 bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Update Data {{ ENTITY_NAME }}
      </q-toolbar-title>
    </q-toolbar>

    <loading-pane v-if="loading" />

    <div v-else class="row flex-center q-my-xl">
      <div class="col-md-6 col-xs-12">
        <q-card class="rounded-borders">
          <q-card-section>
            <async-form
              :fields="FIELDS"
              :loading="loading"
              :initial="initial"
              :options="options"
              @submit="onSubmit"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  PropType,
  onMounted,
  computed,
  reactive
} from 'vue';
import { useSingleEntity, useUpdateEntity } from 'src/compose/entity';
import { getOptionsEntity } from 'src/serv/entity/options-entity.serv';
import AsyncForm from 'components/async-form.vue';
import LoadingPane from 'components/loading-pane.vue';
import { UPDATE_FIELDS, ENTITY_NAME, BASE_API_URL } from 'src/data/product';
import * as ProductCategoryData from 'src/data/pcat';

export default defineComponent({
  components: {
    AsyncForm,
    LoadingPane,
  },
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    },
  },
  setup(props) {
    const { id } = toRefs(props);
    const url = computed(() => `${BASE_API_URL}/${id.value}`);

    const {
      result: singleResult,
      getSingleEntity
    } = useSingleEntity(ENTITY_NAME);
    const initial = computed(() => {
      if (singleResult.value.type != 'result') {
        return {
          name: '',
          unit: '',
          categories: []
        }
      }
      const _data = { ...(singleResult.value.data as any) };
      const data = {
        name: _data.name,
        unit: _data.unit,
        categories: _data.categories.map((c: any) => {
          return {
            value: c.id,
            label: c.title
          }
        })
      };
      console.log(data);
      return data;
    });

    const {
      result: updateResult,
      updateEntity
    } = useUpdateEntity(ENTITY_NAME);


    const loading = computed(() => singleResult.value.type == 'loading' || updateResult.value.type == 'loading');

    const options: any = reactive({
      categories: []
    });

    onMounted(() => {
      getSingleEntity(url.value);
      getOptionsEntity(ProductCategoryData.BASE_API_URL)
        .then(opts => {
          options.categories = opts;
        })
        .catch(err => {
          console.log(err);
        });
    });

    function onSubmit(_payload: any) {
      const payload = {
        ..._payload,
        categories: _payload.categories.map((it: any) => ({
          id: it.value
        }))
      }
      updateEntity(url.value, payload);
    }

    return {
      ENTITY_NAME,
      FIELDS: UPDATE_FIELDS,
      loading,
      onSubmit,
      initial,
      options,
    };
  },
});
</script>
