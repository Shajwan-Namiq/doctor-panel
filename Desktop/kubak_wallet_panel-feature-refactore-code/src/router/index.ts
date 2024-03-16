import { validateAndLoadUserState } from "@/middlewares/auth";
import guest from "@/middlewares/guest";
import { currentUser } from "@/stores/currentUser";
import { createRouter, createWebHistory } from "vue-router";
import { PolicyType } from "@/backend/wallet";
import { loadPolicies } from "@/main";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/auth/user/list.vue"),
      meta: { layout: "MainLayout", middleware: validateAndLoadUserState },
    },
    {
      path: "/home",
      name: "user",
      redirect: { name: "userList" },
      meta: {
        layout: "MainLayout",
        middleware: validateAndLoadUserState,
        policy: ["ReadUser"],
      },
      children: [
        {
          path: "user_list",
          meta: { policy: ["ReadUser"] },
          name: "userList",
          component: () => import("@/views/auth/user/list.vue"),
        },
        {
          path: "detail/:id",
          meta: { policy: [PolicyType.READ_USER] },
          name: "userDetail",
          component: () => import("@/views/auth/user/detail.vue"),
        },
      ],
    },
    {
      path: "/roles",
      name: "roles",
      meta: {
        layout: "MainLayout",
        middleware: validateAndLoadUserState,
        policy: [PolicyType.READ_ROLE],
      },
      component: () => import("@/views/wallet/roles/index.vue"),
    },
    {
      path: "/baseRoles",
      name: "baseRoles",
      meta: {
        layout: "MainLayout",
        middleware: validateAndLoadUserState,
        policy: [PolicyType.READ_BASE_ROLE],
      },
      component: () => import("@/views/wallet/baseRoles/index.vue"),
    },
    {
      path: "/translation",
      name: "translation",
      meta: {
        layout: "MainLayout",
        middleware: validateAndLoadUserState,
        policy: [PolicyType.READ_TRANSLATION],
      },
      children: [
        {
          path: "/translation",
          name: "transportationTranslation",
          component: () => import("@/views/wallet/translation/index.vue"),
        },
        {
          path: "/wallet",
          name: "walletTranslation",
          component: () =>
            import("@/views/wallet/translation/walletTranslations.vue"),
        },
      ],
    },
    {
      path: "/wallet",
      name: "wallet",
      meta: {
        layout: "MainLayout",
        middleware: validateAndLoadUserState,
        policy: [PolicyType.READ_TRANSACTION, PolicyType.READ_WALLET],
      },
      children: [
        {
          path: "transaction",
          meta: { policy: [PolicyType.READ_TRANSACTION] },
          children: [
            {
              path: "list",
              name: "transactionList",
              component: () =>
                import("@/views/wallet/wallet/transactions/list.vue"),
            },
          ],
        },
        {
          path: "wallet",
          meta: { policy: [PolicyType.READ_WALLET] },
          children: [
            {
              path: "list",
              name: "walletList",
              component: () => import("@/views/wallet/wallet/list.vue"),
            },
          ],
        },
        {
          path: "adminTransaction",
          children: [
            {
              path: "list",
              name: "adminTransactionList",
              component: () =>
                import("@/views/wallet/adminTransaction/list.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("../views/common/notFound.vue"),
      meta: { layout: "notFoundLayout" },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("accessToken");
  const store = currentUser();

  // Handle redirection for authenticated users
  if (token) {
    console.log("aaaaaa///");
    if (to.matched.some((record) => record.meta.middleware === guest)) {
      return next({ name: "home" });
    }
  } else {
    if (
      to.matched.some(
        (record) => record.meta.middleware === validateAndLoadUserState
      )
    ) {
      console.log("Redirecting to login because there's no access token.");
      window.location.href = `${import.meta.env.MAIN_PANEL_URL}`;
      // return next({ name: "login" });
    }
  }

  // Check if the current route requires specific policies
  if (to.meta.policy) {
    if (!store.policies || store.policies.length === 0) {
      console.log(
        "Redirecting to fallbackSafeRouteName due to lack of policies."
      );
      window.location.href = `${import.meta.env.MAIN_PANEL_URL}`;
      // return next({ name: "fallbackSafeRouteName" });
    }

    const requiredPolicies = to.meta.policy;
    const hasRequiredPolicies = requiredPolicies.every((policy) =>
      store.policies.includes(policy)
    );

    if (!hasRequiredPolicies) {
      console.log(
        "Redirecting to fallbackRouteName due to missing required policies."
      );
      window.location.href = `${import.meta.env.MAIN_PANEL_URL}`;
    }
  }

  // Execute route-specific
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];
    const context = { from, next, router, to };
  }

  return next();
});

export default router;
