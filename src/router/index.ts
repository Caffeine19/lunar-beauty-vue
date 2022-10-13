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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/MainView/MainView.vue"),
      children: [
        {
          path: "/main/home",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "/main/library",
          name: "library",
          component: () => import("@/views/LibraryView/LibraryView.vue"),
          redirect: { name: "productOverview" },
          children: [
            {
              path: "/main/library/productOverview",
              name: "productOverview",
              component: () =>
                import("@/views/LibraryView/ProductOverviewView.vue"),
            },
            {
              path: "/main/library/productDetail",
              name: "productDetail",
              component: () =>
                import("@/views/LibraryView/ProductDetailView.vue"),
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
          component: () => import("@/views/RoutineView.vue"),
        },
      ],
    },
  ],
});

export default router;
