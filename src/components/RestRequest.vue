<template>
  <div class="fluid grid formgrid">
    <div class="col-12">
      <div class="card">
        <h5>Запрос</h5>
        <div class="formgroup-inline">
          <div class="field" style="min-width: 60%">
            <label for="url" class="p-sr-only">Url</label>
            <InputText
              id="url"
              type="text"
              placeholder="Укажите адрес сайта"
              v-model="urlStr"
              style="width: 100%"
            />
          </div>
          <Button label="Submit" @click="clickReq"></Button>
        </div>
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <h5>Ответ</h5>
        <div class="p-fluid formgrid grid">
          <div class="field col-12">
            <label for="result">Результат</label>
            <Textarea id="result" rows="8" v-model="answerStr" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { axiosInstance } from '@/axios';
import { useAuthStore } from '@/store';

const urlStr = ref<string>();
const answerStr = ref<string>();

const clickReq = () => {
  const payload = {
    url: urlStr.value,
  };

  console.log(payload);

  axiosInstance
    .post('/request', payload)
    .then(
      (response) => {
        answerStr.value = JSON.stringify(response.data);
      },
      (error) => {
        console.error(`ERROR: ${error.response.data}`);
        answerStr.value = error.response.data;
      }
    )
    .catch((error) => {
      answerStr.value = error.response.data;
    });
};
</script>
