const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Home.vue") }],
  },
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/Auth.vue") }],
  },
  {
    path: "/wallet",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Wallet.vue") }],
  },
  {
    path: "/profile",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Profile.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
