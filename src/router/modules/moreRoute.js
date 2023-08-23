// 多级路由
import LayoutMain from '@/layouts/LayoutMain/index.vue';
import LayoutEmpty from '@/layouts/LayoutEmpty/index.vue';

const moreRoute = {
  meta: {
    icon: 'el-icon-ali-yuedu',
    title: '多级路由',
  },
  path: '/moreRoutes',
  component: LayoutMain,
  redirect: '/moreRoutes/page1',
  name: 'moreRoutes',
  children: [
    {
      path: 'page1',
      name: 'moreRoutes1',
      component: () => import('@/views/MoreRoutes/index.vue'),
      meta: {
        title: '导航1',
      },
    },
    {
      path: 'level2',
      name: 'moreRoutes2',
      component: LayoutEmpty,
      redirect: '/moreRoutes/level2/page',
      meta: {
        title: '导航2',
      },
      children: [
        {
          path: 'page',
          name: 'moreRoutes2-1',
          component: () => import('@/views/MoreRoutes/level2/index.vue'),
          meta: {
            title: '导航2-1',
          },
        },
        {
          path: 'level3',
          name: 'moreRoutes2-2',
          component: LayoutEmpty,
          redirect: '/moreRoutes/level2/level3/page1',
          meta: {
            title: '导航2-2',
            // sidebarHidden: true,
          },
          children: [
            {
              path: 'page1',
              name: 'moreRoutes2-2-1',
              component: () => import('@/views/MoreRoutes/level2/level3/index1.vue'),
              meta: {
                title: '导航2-2-1',
              },
            },
            {
              path: 'page2',
              name: 'moreRoutes2-2-2',
              component: () => import('@/views/MoreRoutes/level2/level3/index2.vue'),
              meta: {
                title: '导航2-2-2',
              },
            },
            {
              path: 'page3',
              name: 'moreRoutes2-2-3',
              component: () => import('@/views/MoreRoutes/level2/level3/index1.vue'),
              meta: {
                title: '导航2-2-1',
              },
            },
            {
              path: 'page4',
              name: 'moreRoutes2-2-4',
              component: () => import('@/views/MoreRoutes/level2/level3/index2.vue'),
              meta: {
                title: '导航2-2-2',
              },
            },
            {
              path: 'page5',
              name: 'moreRoutes2-2-5',
              component: () => import('@/views/MoreRoutes/level2/level3/index1.vue'),
              meta: {
                title: '导航2-2-1',
              },
            },
            {
              path: 'page6',
              name: 'moreRoutes2-2-6',
              component: () => import('@/views/MoreRoutes/level2/level3/index2.vue'),
              meta: {
                title: '导航2-2-2',
              },
            },
            {
              path: 'page7',
              name: 'moreRoutes2-2-7',
              component: () => import('@/views/MoreRoutes/level2/level3/index1.vue'),
              meta: {
                title: '导航2-2-1',
              },
            },
            {
              path: 'page8',
              name: 'moreRoutes2-2-8',
              component: () => import('@/views/MoreRoutes/level2/level3/index2.vue'),
              meta: {
                title: '导航2-2-2',
              },
            },
            {
              path: 'page9',
              name: 'moreRoutes2-2-9',
              component: () => import('@/views/MoreRoutes/level2/level3/index2.vue'),
              meta: {
                title: '导航2-2-2',
              },
            },
          ],
        },
      ],
    },
  ],
};
export default moreRoute;
