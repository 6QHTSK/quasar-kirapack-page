
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'notemover',
        component: () => import('pages/Notemover.vue')
      },
      {
        path: 'greynotefix',
        component: () => import('pages/Greynotefixer.vue')
      },
      {
        path: 'bdoff',
        component: () => import('pages/Bdofficial.vue')
      },
      {
        path: 'diff',
        name: 'diff',
        component: () => import('pages/Diffanalysis.vue')
      },
      {
        path: 'bdany',
        component: () => import('pages/Bdanalysis.vue')
      },
      {
        path: 'kira',
        component: () => import('pages/Kirapack.vue')
      },
      {
        path: 'sonolusUpload',
        component: () => import('pages/SonolusUpload.vue')
      },
      {
        path: 'search',
        component: () => import('pages/BestdoriSearch.vue')
      },
      {
        path: 'tempo',
        component: () => import('pages/tempo.vue')
      },
      {
        path: ':id(\\d+)',
        component: () => import('pages/jump.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
