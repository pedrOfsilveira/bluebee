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
  {
    path: "/explore",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ExploreAssets.vue") }],
  },
  {
    path: "/calculator",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Calculator.vue") }],
  },
  {
    path: "/glossary",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Glossary.vue") }],
  },
  {
    path: "/security",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Security.vue") }],
  },
  {
    path: "/quiz",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Quiz.vue") }],
  },
  {
    path: "/investprofile",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/InvestorProfile.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
