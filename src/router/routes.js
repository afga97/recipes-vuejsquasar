
const routes = [
  {
    path: '/',
    redirect: '/chefs/prueba'
  },
  {
    path: '/generics',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Generic.vue') }
    ]
  },
  {
    path: '/chefs/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Chef.vue') },
      { path: 'prueba/', component: () => import('pages/Prueba.vue') },
      { path: 'prueba2/', component: () => import('pages/prueba2.vue') },
      { path: 'prueba3/', component: () => import('pages/Chef.vue') }

    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
