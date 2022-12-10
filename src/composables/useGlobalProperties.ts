import { getCurrentInstance } from 'vue';
import type { AppState } from '@/main';

interface GlobalProperties {
  $appState: AppState;
}

export const useGlobalProperties = () => {
  const globalProperties = getCurrentInstance()?.appContext.config
    .globalProperties as GlobalProperties;

  return {
    globalProperties,
  };
};
