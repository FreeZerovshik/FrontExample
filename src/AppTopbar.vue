<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()" />
      <span>RESTor</span>
    </router-link>
    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar"></i>
          <span>Events</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button" @click="onTopbarMenuToggle">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button" @click="onProfileToggle">
          <i class="pi pi-user"></i>
          <span>{{ getUsername }}</span>
        </button>
        <Menu id="profile_menu" ref="menuPofile" :model="itemsProfileMenu" :popup="true" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useGlobalProperties } from '@/composables/useGlobalProperties';
import { useAuthStore } from '@/store';

const { globalProperties } = useGlobalProperties();
const { $appState } = globalProperties;
const router = useRouter();
const authStore = useAuthStore();
const authLogout = computed(() => authStore.authLogout);
const getUsername = computed(() => authStore.getUsername);
const menuPofile = ref();

const itemsProfileMenu = ref([
  {
    label: `${getUsername.value ? ` ${getUsername.value}` : ''}`,
    icon: 'pi pi-id-card',
    command: () => {
      router.push('/user');
    },
  },
  {
    label: 'Выход',
    icon: 'pi pi-sign-out',
    command: () => {
      authLogout.value();
      router.push('/login');
    },
  },
]);

const emit = defineEmits(['menu-toggle', 'topbar-menu-toggle']);

const onMenuToggle = (event: unknown) => {
  emit('menu-toggle', event);
};

const onTopbarMenuToggle = (event: unknown) => {
  emit('topbar-menu-toggle', event);
};

const onProfileToggle = (event: Event) => {
  menuPofile.value.toggle(event);
};

const topbarImage = () => {
  return $appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
};

const darkTheme = computed(() => {
  return $appState.darkTheme;
});
</script>
