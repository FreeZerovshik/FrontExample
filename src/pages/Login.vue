<template>
  <form
    class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
      <div class="col-12 mt-5 xl:mt-0 text-center">
        <img
          :src="'layout/images/logo-' + logoColor + '.svg'"
          alt="Sakai logo"
          class="mb-5"
          style="width: 81px; height: 60px"
        />
      </div>
      <div
        class="col-12 xl:col-6"
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);
        "
      >
        <div
          class="h-full w-full m-0 py-7 px-4"
          style="
            border-radius: 53px;
            background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));
          "
        >
          <div class="text-center mb-5">
            <img src="layout/images/avatar.png" alt="Image" height="50" class="mb-3" />
            <div class="text-900 text-3xl font-medium mb-3">Welcome!</div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label for="email1" class="block text-900 text-xl font-medium mb-2">Username</label>
            <InputText
              id="email1"
              v-model="username"
              type="text"
              class="w-full mb-3"
              placeholder="Email"
              style="padding: 1rem"
            />

            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
            <Password
              id="password1"
              v-model="password"
              placeholder="Password"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
              @keypress="onPasswordKeyPress"
            ></Password>

            <div class="flex align-items-center justify-content-between mb-5">
              <div class="flex align-items-center">
                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                <label for="rememberme1">Remember me</label>
              </div>
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                >Forgot password?</a
              >
            </div>
            <Button label="Sign In" class="w-full p-3 text-xl" @click="login"></Button>
          </div>
          <Message v-if="errorMessage" :severity="errorMessage?.porps.severity" :closable="false">
            {{ errorMessage.content }}
          </Message>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { axiosInstance } from '@/axios';
import { useAuthStore } from '@/store';

import { MessageProps } from 'primevue/message';
import { LoginRequestPayload, LoginResponsePayload } from '@/components/user';

export interface Message {
  porps: MessageProps;
  content: string;
}

const router = useRouter();
const authStore = useAuthStore();

const username = ref<string>();
const password = ref<string>();
const errorMessage = ref<Message>();
const checked = ref<boolean>();

const authLogin = computed(() => authStore.authLogin);

const logoColor = computed(() => {
  // if (this.$appState.darkTheme) return "white";
  // return "dark";
  return 'white';
});

const login = () => {
  axiosInstance
    .post('/auth/signin', {
      username: username.value,
      password: password.value,
    } as LoginRequestPayload)
    .then(
      (response) => {
        authLogin.value(response.data as LoginResponsePayload);

        if (response.data.user.newPass) {
          router.push('/users/new-password');
        } else {
          router.push('/');
        }
      },
      (error) => {
        errorMessage.value = {
          porps: { severity: 'error' },
          content:
            error.response.data.message.length < 150
              ? error.response.data.message
              : 'Request error. Please, report this error website owners',
        } as Message;
      }
    )
    .catch((e) => {
      errorMessage.value = {
        porps: { severity: 'error' },
        content:
          e.response.data.message.length < 150
            ? e.response.data.message
            : 'Request error. Please, report this error website owners',
      } as Message;
    });
};

const onPasswordKeyPress = (ke: KeyboardEvent) => {
  if (ke.key === 'Enter') {
    login();
  }
};

watch(
  () => `${username.value}${password.value}`,
  () => {
    errorMessage.value = undefined;
  }
);
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
