import type { AppState } from "./main";

declare module "*.vue" {
  import { defineComponent } from "vue";

  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $appState: AppState;
  }
}

declare module "vue-router" {
  interface RouteMeta {
    typeRoute?: string;
    requiresAuth?: boolean;
  }
}
