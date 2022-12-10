import { createRouter, createWebHashHistory, RouteLocationRaw } from 'vue-router';

import { axiosInstance } from '@/axios';
import { useAuthStore } from '@/store';

import App from '../App.vue';

const routes = [
  {
    path: '/',
    name: 'app',
    component: App,
    children: [
      {
        path: '/rest',
        name: 'rest',
        component: () => import('../components/RestRequest.vue'),
      },
      {
        path: '/places',
        name: 'places',
        component: () => import('../components/place/PlaceList.vue'),
      },
      {
        path: '',
        name: 'dashboard',
        component: () => import('../components/Dashboard.vue'),
      },
      {
        path: '/formlayout',
        name: 'formlayout',
        component: () => import('../components/FormLayoutDemo.vue'),
      },
      {
        path: '/input',
        name: 'input',
        component: () => import('../components/InputDemo.vue'),
      },
      {
        path: '/floatlabel',
        name: 'floatlabel',
        component: () => import('../components/FloatLabelDemo.vue'),
      },
      {
        path: '/invalidstate',
        name: 'invalidstate',
        component: () => import('../components/InvalidStateDemo.vue'),
      },
      {
        path: '/button',
        name: 'button',
        component: () => import('../components/ButtonDemo.vue'),
      },
      {
        path: '/table',
        name: 'table',
        component: () => import('../components/TableDemo.vue'),
      },
      {
        path: '/list',
        name: 'list',
        component: () => import('../components/ListDemo.vue'),
      },
      {
        path: '/tree',
        name: 'tree',
        component: () => import('../components/TreeDemo.vue'),
      },
      {
        path: '/panel',
        name: 'panel',
        component: () => import('../components/PanelsDemo.vue'),
      },
      {
        path: '/overlay',
        name: 'overlay',
        component: () => import('../components/OverlayDemo.vue'),
      },
      {
        path: '/media',
        name: 'media',
        component: () => import('../components/MediaDemo.vue'),
      },
      {
        path: '/menu',
        component: () => import('../components/MenuDemo.vue'),
        children: [
          {
            path: '',
            component: () => import('../components/menu/PersonalDemo.vue'),
          },
          {
            path: '/menu/seat',
            component: () => import('../components/menu/SeatDemo.vue'),
          },
          {
            path: '/menu/payment',
            component: () => import('../components/menu/PaymentDemo.vue'),
          },
          {
            path: '/menu/confirmation',
            component: () => import('../components/menu/ConfirmationDemo.vue'),
          },
        ],
      },
      {
        path: '/messages',
        name: 'messages',
        component: () => import('../components/MessagesDemo.vue'),
      },
      {
        path: '/file',
        name: 'file',
        component: () => import('../components/FileDemo.vue'),
      },
      {
        path: '/chart',
        name: 'chart',
        component: () => import('../components/ChartDemo.vue'),
      },
      {
        path: '/misc',
        name: 'misc',
        component: () => import('../components/MiscDemo.vue'),
      },
      {
        path: '/crud',
        name: 'crud',
        component: () => import('../pages/CrudDemo.vue'),
      },
      {
        path: '/timeline',
        name: 'timeline',
        component: () => import('../pages/TimelineDemo.vue'),
      },
      {
        path: '/empty',
        name: 'empty',
        component: () => import('../components/EmptyPage.vue'),
      },
      {
        path: '/documentation',
        name: 'documentation',
        component: () => import('../components/Documentation.vue'),
      },
      {
        path: '/blocks',
        name: 'blocks',
        component: () => import('../components/BlocksDemo.vue'),
      },
      {
        path: '/icons',
        name: 'icons',
        component: () => import('../components/IconsDemo.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import('../pages/LandingDemo.vue'),
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../pages/Error.vue'),
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: () => import('../pages/NotFound.vue'),
  },
  {
    path: '/access',
    name: 'access',
    component: () => import('../pages/Access.vue'),
  },
  { path: '/:pathMatch(.*)*', component: () => import('../pages/NotFound.vue') },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// eslint-disable-next-line consistent-return
router.beforeEach((to): RouteLocationRaw | void => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated && to.name !== 'login') {
    return { name: 'login' };
  }
});

// перехват 401 ошибки и редирект на страницу входа
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();

    if (error.response.status === 401) {
      authStore.authLogout();
      router.push('/login');
    }

    return Promise.reject(error);
  }
);

export default router;
