<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Toolbar</h5>
        <Toolbar>
          <template v-slot:start>
            <Button label="New" icon="pi pi-plus" class="mr-2" @click="clickNew" />
          </template>
        </Toolbar>
      </div>
    </div>
    <div class="col-12">
      <div class="card">
        <h5>Список мест</h5>
        <DataTable
          :value="places"
          v-model:selection="selectedPlaces"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="10"
          dataKey="id"
          :rowHover="true"
          :loading="loading"
          responsiveLayout="scroll"
          :globalFilterFields="['name']"
        >
          <template #empty> No places found. </template>
          <template #loading> Loading places data. Please wait. </template>
          <Column selectionMode="multiple" style="min-width: 1rem" :exportable="false" />
          <Column field="name" header="Наименование" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data?.name }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
          </Column>
          <Column field="description" header="Описание" style="min-width: 12rem">
            <template #body="{ data }">
              <span v-if="data?.description && data.description?.length > 100">{{
                `${data.description.slice(0, 100)}...`
              }}</span>
              <span v-else>{{ data?.description }} </span>
            </template>
          </Column>
          <Column field="mainLink" header="Ссылка на место" style="min-width: 12rem">
            <template #body="{ data }">
              <a v-if="data.mainUrl" :href="`${data.mainUrl}`" target="_blank">
                <span>{{ data?.mainUrl }}</span>
              </a>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <PlaceDialog
      :visible="placeDialog"
      :submitted="submitted"
      @visible-change="onDialogVisibleChange"
      @submitted-change="onDialogSubmittedChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '@/store';
import { axiosInstance } from '@/axios';
import { Place } from './types';
import { User } from '../user';
import PlaceDialog from './PlaceDialog.vue';

const authStore = useAuthStore();
const getToken = computed(() => authStore.getToken);
const getUserId = computed(() => authStore.getUserId);

const places = ref<Place[]>([] as Place[]);
const place = ref<Place>({} as Place);
const selectedPlaces = ref<Place[]>([] as Place[]);

const loading = ref();
const placeDialog = ref(false);
const submitted = ref(false);

const findIndexById = (id: number) => {
  let index = -1;
  for (let i = 0; i < places.value.length; i++) {
    if (places.value[i].id === id) {
      index = i;
      break;
    }
  }

  return index;
};

const clickNew = () => {
  // let createdUser = {} as User;

  submitted.value = false;
  placeDialog.value = true;
};

const onDialogVisibleChange = (value: boolean, action?: 'NEW' | 'UPDATE', payload?: Place) => {
  placeDialog.value = value;

  if (placeDialog.value) {
    return;
  }

  if (action === 'UPDATE') {
    places.value[findIndexById(place.value.id)] = payload as Place;

    // toast.add({
    //   severity: 'success',
    //   summary: 'Successful',
    //   detail: 'Задача обновлена',
    //   life: 3000,
    // });
  } else if (action === 'NEW') {
    places.value.unshift(payload as Place);

    // toast.add({
    //   severity: 'success',
    //   summary: 'Successful',
    //   detail: 'Задача добавлена',
    //   life: 3000,
    // });
  }

  place.value = {} as Place;
};

const onDialogSubmittedChange = (value: boolean) => {
  submitted.value = value;
};

const loadPlaces = () => {
  axiosInstance
    .get('/places', {
      headers: { Authorization: `Bearer ${getToken.value}` },
    })
    .then((response) => {
      places.value.push(...response.data);
    })
    .catch((error) => {})
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => {
  loadPlaces();
});
</script>
