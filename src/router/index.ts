import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/MainView.vue"),
      children: [
        {
          path: "/main/home",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "/main/library",
          name: "library",
          component: () => import("@/views/LibraryView.vue"),
          redirect: { name: "productOverview" },
          children: [
            {
              path: "/main/library/productOverview",
              name: "productOverview",
              component: () =>
                import("@/views/ProductOverviewView/ProductOverviewView.vue"),
            },
            {
              path: "/main/library/productDetail",
              name: "productDetail",
              component: () => import("@/views/ProductDetailView.vue"),
            },
          ],
        },
        {
          path: "/main/store",
          name: "store",
          component: () => import("@/views/StoreView.vue"),
        },

        {
          path: "/main/routine",
          name: "routine",
          component: () => import("@/views/RoutineView/RoutineView.vue"),
        },
      ],
    },
  ],
});

export default router;
