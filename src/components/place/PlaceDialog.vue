<template>
  <Dialog
    v-model:visible="visible"
    :style="{ width: '1024px' }"
    header="Место"
    :modal="true"
    class="p-fluid"
    :closable="true"
    @update:visible="hideDialog"
  >
    <div class="field">
      <label for="name">Наименование</label>
      <InputText
        id="name"
        v-model.trim="place.name"
        required="true"
        :class="{ 'p-invalid': submitted && !place.name }"
      />
      <small class="p-error" v-if="submitted && !place.name">
        Наименование обязательно для заполнения
      </small>
    </div>
    <div class="field">
      <label for="description">Описание</label>
      <Textarea id="description" v-model="place.description" required="true" rows="3" cols="20" />
    </div>
    <div class="field">
      <label for="name">Ссылка на место</label>
      <div class="col-12">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon"><i class="pi pi-globe"></i></span>

          <InputText
            id="link"
            v-model.trim="place.mainUrl"
            required="true"
            :class="{ 'p-invalid': submitted && !place.mainUrl }"
          />
          <small class="p-error" v-if="submitted && !place.mainUrl">
            Ссылка обязательна для заполнения
          </small>
        </div>
      </div>
    </div>
    <template #footer>
      <Message v-if="errorMessage" severity="error" :closable="false">
        {{ errorMessage }}
        <br />
      </Message>
      <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
      <Button label="Сохранить" icon="pi pi-check" class="p-button-text" @click="savePlace" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, ref, toRefs, watch } from 'vue';
import { axiosInstance } from '@/axios';
import { useAuthStore } from '@/store';
import { Place } from './types';

const authStore = useAuthStore();
const getToken = computed(() => authStore.getToken);
const errorMessage = ref<string>();

const props = defineProps({
  place: {
    type: Object as PropType<Place>,
    default: {} as Place,
  },
  visible: Boolean as PropType<boolean>,
  submitted: Boolean as PropType<boolean>,
});

const emit = defineEmits(['visible-change', 'submitted-change']);

const hideDialog = () => {
  emit('visible-change', false);
  emit('submitted-change', false);
};

const savePlace = () => {
  emit('submitted-change', true);

  if (!props.place.id) {
    const payload = {
      name: props.place.name,
      description: props.place.description,
      mainUrl: props.place.mainUrl,
      eventUrl: props.place.eventUrl,
    } as Place;

    axiosInstance
      .post('/places', payload, {
        headers: { Authorization: `Bearer ${getToken.value}` },
      })
      .then(
        (response) => {
          const data = response.data as Place;

          emit('visible-change', false, 'NEW', data);
        },
        (error) => {
          console.error(`ERROR: ${error.response.data}`);
          errorMessage.value =
            error.response.data.message.length < 150
              ? error.response.data.message
              : 'Request error. Please, report this error website owners';
        }
      )
      .catch((error) => {
        errorMessage.value = `Request error. Please, report this error website owners: ${JSON.stringify(
          error
        )}`;
      });
  }
};

watch(
  () => props.visible,
  () => {
    errorMessage.value = undefined;
  }
);
</script>
