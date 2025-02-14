import { createRouter, createWebHistory } from 'vue-router';
import BaseLayout from '@/views/fullLayout/BaseLayout.vue';
import Projects from '@/views/projects/Projects.vue';
import Settings from '@/views/settings/Settings.vue';
import BaseProjectLayout from '@/views/project/BaseProjectLayout.vue';
import VerticalServicesSidebar from '@/views/fullLayout/vertical-services-sidebar/VerticalServicesSidebar.vue';

const routes = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        name: 'Projects',
        path: 'projects',
        component: Projects,
      },
      {
        name: 'Settings',
        path: 'settings',
        component: Settings,
      },
      {
        name: 'ProjectView',
        path: 'project/:id',
        components: {
          default: BaseProjectLayout,
          sidebar: VerticalServicesSidebar,
        },
        props: { default: true, sidebar: true },
        children: [
          {
            name: 'ProjectBase',
            path: 'info',
            component: () => import('@/views/project/components/Project.vue'),
          },
          {
            name: 'Databases',
            path: 'databases',
            component: () => import('@/views/services/databases/Databases.vue'),
          },
          {
            name: 'N8N',
            path: 'n8n',
            component: () => import('@/views/services/n8n/N8N.vue'),
          },
          {
            name: 'ProjectSettings',
            path: 'settings',
            component: () => import('@/views/project/components/Settings.vue'),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;