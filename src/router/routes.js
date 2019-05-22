
const routes = [
  {
    path: '/',
    redirect: '/chefs/all/'
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
      { path: 'all/', component: () => import('pages/Chefs.vue') }
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
