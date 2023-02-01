import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/intro",
    },
    {
      path: "/intro",
      name: "intro",
      component: () => import("@/views/IntroductionView/IntroductionView.vue"),
    },
    {
      path: "/signIn",
      name: "signIn",
      component: () => import("@/views/SignInView.vue"),
    },
    {
      path: "/main",
      name: "main",
      redirect: "/main/library",
      component: () => import("@/views/MainView/MainView.vue"),
      children: [
        {
          path: "/main/home",
          name: "home",
          component: () => import("@/views/MainView/HomeView.vue"),
        },
        {
          path: "/main/library",
          name: "library",
          component: () =>
            import("@/views/MainView/LibraryView/LibraryView.vue"),
          redirect: { name: "productOverview" },
          children: [
            {
              path: "/main/library/productOverview",
              name: "productOverview",
              component: () =>
                import(
                  "@/views/MainView/LibraryView/ProductOverviewView/ProductOverviewView.vue"
                ),
            },
            {
              path: "/main/library/productDetail",
              name: "productDetail",
              component: () =>
                import("@/views/MainView/LibraryView/ProductDetailView.vue"),
            },
            {
              path: "/main/library/ingredient",
              name: "ingredient",
              component: () =>
                import("@/views/MainView/LibraryView/IngredientView.vue"),
            },
          ],
        },
        {
          path: "/main/store",
          name: "store",
          component: () => import("@/views/MainView/StoreView/StoreView.vue"),
          redirect: "/main/store/storeBoard",
          children: [
            {
              path: "/main/store/storeBoard",
              name: "storeBoard",
              component: () =>
                import("@/views/MainView/StoreView/StoreBoardView.vue"),
            },
            {
              path: "/main/store/selectProduct",
              name: "selectProduct",
              component: () => import("@/views/PickProductView.vue"),
            },
          ],
        },
        {
          path: "/main/routine",
          name: "routine",
          component: () =>
            import("@/views/MainView/RoutineView/RoutineView.vue"),
        },
      ],
    },
  ],
});

export default router;
