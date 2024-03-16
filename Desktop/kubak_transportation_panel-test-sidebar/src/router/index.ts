// import { PolicyType } from "@/backend/auth";
import auth from "@/middlewares/auth";
import guest from "@/middlewares/guest";
import { currentUser } from "@/stores/currentUser";
import TaskList from "../views/transportation/tasks/list.vue";

import { createRouter, createWebHistory } from "vue-router";
import { PolicyType } from "@/backend/transport";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/transportation/dashboard/index.vue"),
      meta: { layout: "MainLayout", middleware: auth },
    },
    {
      path: "/roles",
      name: "roles",
      meta: {
        layout: "MainLayout",
        middleware: auth,
        policy: [PolicyType.READ_ROLE],
      },
      component: () => import("@/views/auth/roles/index.vue"),
    },
    {
      path: "/baseRoles",
      name: "baseRoles",
      meta: {
        layout: "MainLayout",
        middleware: auth,
        policy: [PolicyType.READ_BASE_ROLE],
      },
      component: () => import("@/views/auth/baseRoles/index.vue"),
    },
    {
      path: "/task_Rating_Aspect",
      name: "taskRatingAspect",
      meta: {
        layout: "MainLayout",
        middleware: auth,
        policy: [PolicyType.READ_TASK_RATING_ASPECT],
      },
      component: () =>
        import("@/views/transportation/taskRatingAspect/list.vue"),
    },
    {
      path: "/user",
      name: "user",
      redirect: { name: "userList" },
      meta: {
        layout: "MainLayout",
        middleware: auth,
        policy: [PolicyType.READ_USER, PolicyType.WRITE_USER],
      },
      children: [
        {
          path: "list",
          meta: { policy: [PolicyType.READ_USER] },
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
      path: "/report",
      name: "report",
      meta: {
        layout: "MainLayout",
        middleware: auth,
        policy: [
          PolicyType.READ_TASK,
          PolicyType.READ_SERVANT,
          PolicyType.READ_REQUEST,
          PolicyType.READ_TASK_REPORT,
          PolicyType.READ_TASK_REPORT_DEFINED_PROBLEM,
          PolicyType.READ_TASK_CANCELLATION_PENALIZE,
          PolicyType.READ_TASK_CANCELLATION_POLICY,
          PolicyType.READ_MEMBER,
        ],
      },
      children: [
        {
          path: "daily_reports",
          meta: { policy: [PolicyType.READ_TASK] },
          name: "chartDailyReports",
          component: () => import("@/views/transportation/report/chart.vue"),
        },
        {
          path: "passenger_tasks_report",
          meta: { policy: [PolicyType.READ_MEMBER] },
          name: "PassengerTasksReport",
          component: () =>
            import(
              "@/views/transportation/report/PassengerTasksReport/index.vue"
            ),
        },
        {
          path: "requests_report",
          meta: { policy: [PolicyType.READ_REQUEST] },
          name: "requestReport",
          component: () =>
            import("@/views/transportation/report/requestsReport.vue"),
        },
        {
          path: "/report_problems",
          meta: {
            policy: [
              PolicyType.READ_TASK_REPORT,
              PolicyType.READ_TASK_REPORT_DEFINED_PROBLEM,
            ],
          },
          name: "report_problems",
          redirect: { name: "reportProblemsList" },
          children: [
            {
              path: "list",
              name: "reportProblemsList",
              component: () =>
                import(
                  "@/views/transportation/database/report/reportProblems/list.vue"
                ),
              meta: {
                policy: [
                  PolicyType.READ_TASK_REPORT,
                  PolicyType.READ_TASK_REPORT_DEFINED_PROBLEM,
                ],
              },
            },
          ],
        },
        {
          path: "/report_actions",
          name: "reportAction",
          meta: { policy: [PolicyType.READ_TASK_REPORT_ACTION] },
          redirect: { name: "reportActionList" },
          children: [
            {
              path: "list",
              name: "reportActionList",
              component: () =>
                import(
                  "@/views/transportation/database/report/reportAction/list.vue"
                ),
            },
          ],
        },
        {
          path: "/task_report",
          meta: { policy: [PolicyType.READ_TASK_REPORT] },
          name: "taskReport",
          redirect: { name: "taskReportList" },
          children: [
            {
              path: "list",
              meta: { policy: [PolicyType.READ_TASK_REPORT] },
              name: "taskReportList",
              component: () =>
                import(
                  "@/views/transportation/database/report/taskReport/list.vue"
                ),
            },
            {
              path: "detail/:id",
              meta: { policy: [PolicyType.READ_TASK_REPORT] },
              name: "taskReportDetail",
              component: () =>
                import(
                  "@/views/transportation/database/report/taskReport/detail.vue"
                ),
            },
          ],
        },
        {
          path: "/penalize",
          name: "penalize",
          meta: {
            policy: [
              PolicyType.READ_TASK_CANCELLATION_PENALIZE,
              PolicyType.READ_TASK_CANCELLATION_POLICY,
            ],
          },
          redirect: { name: "taskReportList" },
          children: [
            {
              path: "task_cancelation_penalize",
              meta: {
                policy: [PolicyType.READ_TASK_CANCELLATION_PENALIZE],
              },
              name: "taskCancelationPenalize",
              component: () =>
                import(
                  "@/views/transportation/database/cancelPenalize/taskCancellationPenalize.vue"
                ),
            },
            {
              path: "task_cancelation_policy",
              meta: {
                policy: [PolicyType.READ_TASK_CANCELLATION_POLICY],
              },
              name: "taskCancelationPolicy",
              component: () =>
                import(
                  "@/views/transportation/database/cancelPenalize/taskCancelationPolicy.vue"
                ),
            },
          ],
        },
      ],
    },
    {
      path: "/translation",
      name: "translation",
      meta: {
        layout: "MainLayout",
        middleware: auth,
        policy: [PolicyType.READ_TRANSLATION],
      },
      children: [
        {
          path: "/transportation",
          name: "transportationTranslation",
          component: () =>
            import("@/views/transportation/translation/index.vue"),
        },
        {
          path: "/wallet",
          name: "walletTranslation",
          component: () =>
            import("@/views/transportation/translation/walletTranslations.vue"),
        },
      ],
    },
    {
      path: "/transportation",
      name: "transportation",
      redirect: { name: "transportationHome" },
      meta: {
        layout: "MainLayout",
        middleware: auth,
        policy: [
          PolicyType.READ_CHART,
          PolicyType.WRITE_DISCOUNT_CODE,
          PolicyType.WRITE_DISCOUNT_OFFER,
          PolicyType.READ_DISCOUNT_OFFER,
          PolicyType.READ_REQUEST,
          PolicyType.MONITORING,
          PolicyType.WRITE_REQUEST,
          PolicyType.READ_SERVICE,
          PolicyType.WRITE_SERVICE,
          PolicyType.READ_SERVICE_AREA_PRICE,
          PolicyType.READ_SERVANT,
          PolicyType.READ_USER,
          PolicyType.WRITE_SERVANT,
          PolicyType.READ_VEHICLE,
          PolicyType.WRITE_VEHICLE,
          PolicyType.READ_CANCEL_REASON,
          PolicyType.READ_TASK,
          PolicyType.READ_MEMBER,
        ],
      },
      children: [
        {
          path: "/transportation/home",
          name: "transportationHome",
          component: () => import("@/views/transportation/dashboard/index.vue"),
          meta: { policy: [PolicyType.READ_CHART] },
        },
        {
          path: "user",
          name: "User",
          meta: { layout: "MainLayout", middleware: auth },
          children: [
            {
              path: "profile",
              name: "userProfile",
              component: () => import("@/views/currentUser/profile.vue"),
            },
          ],
        },
        {
          path: "/transportation/discountCode/create",
          name: "transportationCreateDiscountCode",
          component: () =>
            import("@/views/transportation/discountCode/create.vue"),
          meta: { policy: [PolicyType.WRITE_DISCOUNT_CODE] },
        },
        {
          path: "/transportation/discountCode/list",
          name: "transportationListDiscountCode",
          component: () =>
            import("@/views/transportation/discountCode/list.vue"),
          meta: { policy: [PolicyType.READ_DISCOUNT_CODE] },
        },
        {
          path: "/transportation/discountCode/usage",
          name: "transportationUsageDiscountCode",
          component: () =>
            import("@/views/transportation/discountCode/usage.vue"),
          meta: { policy: [PolicyType.READ_DISCOUNT_CODE] },
        },
        {
          path: "/transportation/discountCode/detail/:id",
          name: "transportationDetailDiscountCode",
          component: () =>
            import("@/views/transportation/discountCode/detail.vue"),
          meta: { policy: [PolicyType.WRITE_DISCOUNT_CODE] },
        },
        {
          path: "/transportation/discountOffers/create",
          name: "transportationCreateDiscountOffers",
          component: () =>
            import("@/views/transportation/discountOffers/create.vue"),
          meta: { policy: [PolicyType.WRITE_DISCOUNT_OFFER] },
        },
        {
          path: "/transportation/discountOffers/list",
          name: "transportationListDiscountOffers",
          component: () =>
            import("@/views/transportation/discountOffers/list.vue"),
          meta: { policy: [PolicyType.READ_DISCOUNT_OFFER] },
        },
        {
          path: "/transportation/discountOffers/detail/:id",
          name: "transportationDetailDiscountOffers",
          component: () =>
            import("@/views/transportation/discountOffers/detail.vue"),
          meta: { policy: [PolicyType.WRITE_DISCOUNT_OFFER] },
        },
        {
          path: "requests",
          meta: { policy: [PolicyType.READ_REQUEST] },
          name: "transportationRequestList",
          redirect: { name: "requestsList" },
          children: [
            {
              path: "list",
              name: "requestsList",
              component: () =>
                import("@/views/transportation/support/requests/list.vue"),
              meta: { policy: [PolicyType.READ_REQUEST] },
            },
            {
              path: "detail/:id",
              name: "requestsDetail",
              component: () =>
                import("@/views/transportation/support/requests/detail.vue"),
              meta: { policy: [PolicyType.READ_REQUEST] },
            },
          ],
        },
        {
          path: "monitoring",
          name: "transportationMonitoring",
          component: () =>
            import("@/views/transportation/support/monitoring/index.vue"),
          meta: { policy: [PolicyType.MONITORING] },
        },
        {
          meta: { policy: [PolicyType.PERFORM_MAP_MATCHING] },
          path: "map_matching",
          name: "transportationMapMatching",
          component: () =>
            import("@/views/transportation/support/mapMatching/index.vue"),
        },
        {
          path: "create_request",
          name: "transportationCreateRequest",
          component: () =>
            import("@/views/transportation/support/createRequest/index.vue"),
          meta: { policy: [PolicyType.WRITE_REQUEST] },
        },
        {
          path: "services",
          meta: {
            policy: [
              PolicyType.READ_SERVICE,
              PolicyType.WRITE_SERVICE,
              PolicyType.READ_SERVICE_AREA_PRICE,
            ],
          },
          name: "services",
          redirect: { name: "listService" },
          children: [
            {
              path: "list",
              name: "listService",
              component: () =>
                import("@/views/transportation/services/listServiceType.vue"),
              meta: {
                policy: [
                  PolicyType.READ_SERVICE,
                  PolicyType.READ_SERVICE_AREA_PRICE,
                ],
              },
            },
            {
              path: "detail/:id",
              name: "detailService",
              component: () =>
                import("@/views/transportation/services/detail.vue"),
              meta: { policy: [PolicyType.READ_SERVICE] },
            },
            {
              path: "createService/:id",
              name: "createService",
              component: () =>
                import("@/views/transportation/services/createService.vue"),
              meta: {
                policy: [PolicyType.WRITE_SERVICE],
              },
            },
            {
              path: "listServiceBaseType",
              meta: { policy: [PolicyType.READ_SERVICE_TYPE] },
              name: "listServiceBaseType",
              component: () =>
                import("@/views/transportation/services/baseType/list.vue"),
            },
          ],
        },
        {
          path: "servant",
          meta: {
            policy: [
              PolicyType.READ_SERVANT,
              PolicyType.READ_USER,
              PolicyType.WRITE_SERVANT,
              PolicyType.WRITE_VEHICLE,
            ],
          },
          name: "servant",
          redirect: { name: "listServant" },
          children: [
            {
              path: "list",
              name: "listServant",
              component: () =>
                import("@/views/transportation/servant/list.vue"),
              meta: { policy: [PolicyType.READ_SERVANT] },
            },
            {
              path: "onlineHistory",
              name: "servantOnlineHistory",
              component: () =>
                import(
                  "@/views/transportation/servant/onlineHistory/onlineHistory.vue"
                ),
              meta: { policy: [PolicyType.READ_SERVANT] },
            },
            {
              path: "servant_ranking",
              name: "servantRanking",
              component: () =>
                import(
                  "@/views/transportation/report/servantReport/servantReport.vue"
                ),
              meta: { policy: [PolicyType.READ_SERVANT] },
            },
            {
              path: "servantHourlyReport",
              name: "servantHourlyReport",
              component: () =>
                import("@/views/transportation/servant/hourlyReport/index.vue"),
              meta: { policy: [PolicyType.READ_SERVANT] },
            },
            {
              path: "create",
              meta: {
                policy: [
                  PolicyType.READ_USER,
                  PolicyType.WRITE_SERVANT,
                  PolicyType.WRITE_VEHICLE,
                ],
              },
              name: "createServant",
              component: () =>
                import("@/views/transportation/servant/createServantSteps.vue"),
              children: [
                {
                  path: "checkUser",
                  name: "userExist",
                  component: () =>
                    import("@/views/transportation/servant/userExist.vue"),
                  meta: { policy: [PolicyType.READ_USER] },
                },
                {
                  path: "createServant",
                  name: "createServant",
                  component: () =>
                    import("@/views/transportation/servant/create.vue"),
                  meta: { policy: [PolicyType.WRITE_SERVANT] },
                },
                {
                  path: "createVehicleServant",
                  name: "createVehicleServant",
                  component: () =>
                    import("@/views/transportation/vehicle/create.vue"),
                  meta: { policy: [PolicyType.WRITE_VEHICLE] },
                },
              ],
            },
            {
              path: "detail/:id",
              name: "detailServant",
              component: () =>
                import("@/views/transportation/servant/detail.vue"),
              meta: { policy: [PolicyType.READ_SERVANT] },
            },
          ],
        },
        {
          path: "vehicle",
          name: "vehicle",
          meta: { policy: [PolicyType.READ_VEHICLE, PolicyType.WRITE_VEHICLE] },
          redirect: { name: "listVehicle" },
          children: [
            {
              path: "list",
              name: "listVehicle",
              component: () =>
                import("@/views/transportation/vehicle/list.vue"),
              meta: { policy: [PolicyType.READ_VEHICLE] },
            },
            {
              path: "create",
              name: "createVehicle",
              component: () =>
                import("@/views/transportation/vehicle/create.vue"),
              meta: { policy: [PolicyType.WRITE_VEHICLE] },
            },
            {
              path: "vehicleDetail/:id",
              name: "vehicleDetail",
              component: () =>
                import("@/views/transportation/vehicle/detail.vue"),
              meta: { policy: [PolicyType.READ_VEHICLE] },
            },
          ],
        },
        {
          path: "cancelReason",
          name: "cancelReason",
          component: () =>
            import("@/views/transportation/cancelReason/list.vue"),
          meta: { policy: [PolicyType.READ_CANCEL_REASON] },
        },
        {
          path: "task",
          meta: { policy: [PolicyType.READ_TASK] },
          name: "task",
          redirect: { name: "listTasks" },
          children: [
            {
              path: "list",
              name: "listTasks",
              component: TaskList,
              meta: { policy: [PolicyType.READ_TASK] },
            },
            {
              path: "detail/:id",
              name: "detailTask",
              component: () =>
                import("@/views/transportation/tasks/detail.vue"),
              meta: { policy: [PolicyType.READ_TASK] },
            },
            {
              path: "detail/request/:id",
              name: "detailRequestTask",
              component: () =>
                import("@/views/transportation/tasks/detail.vue"),
              meta: { policy: [PolicyType.READ_TASK] },
            },
            {
              path: "canceledTasks",
              name: "canceledTasks",
              component: () =>
                import("@/views/transportation/tasks/canceledTasks.vue"),
              meta: { policy: [PolicyType.READ_TASK] },
            },
            {
              path: "hourlyReport",
              name: "hourlyReport",
              component: () =>
                import("@/views/transportation/tasks/hourlyReport.vue"),
              meta: { policy: [PolicyType.READ_TASK] },
            },
          ],
        },
        {
          path: "passenger",
          meta: { policy: [PolicyType.READ_MEMBER, PolicyType.READ_USER] },
          name: "passenger",
          redirect: { name: "passengerDetail" },
          children: [
            {
              path: "list",
              name: "passengerDetail",
              component: () =>
                import("@/views/transportation/passenger/passengerDetail.vue"),
              meta: { policy: [PolicyType.READ_MEMBER] },
            },
            {
              path: "list",
              name: "passengerProfile",
              component: () =>
                import(
                  "@/views/transportation/passenger/detailTabs/profile.vue"
                ),
              meta: { policy: [PolicyType.READ_USER] },
            },
            {
              path: "list",
              name: "passengerTasks",
              component: () =>
                import("@/views/transportation/passenger/detailTabs/tasks.vue"),
              meta: { policy: [PolicyType.READ_USER] },
            },
          ],
        },
        {
          path: "setting",
          meta: {
            policy: [
              PolicyType.READ_HEAT_MAP_CONFIGURATION,
              PolicyType.READ_SERVICE_APP_CONFIGURATION,
            ],
          },
          children: [
            {
              path: "heat_map",
              name: "heatMap",
              component: () => import("@/views/city/setting/heatmap/index.vue"),
              meta: { policy: [PolicyType.READ_HEAT_MAP_CONFIGURATION] },
            },
            {
              path: "service_app_configuration",
              name: "serviceAppConfiguration",
              component: () =>
                import("@/views/city/setting/serviceAppConfiguration.vue"),
              meta: { policy: [PolicyType.READ_SERVICE_APP_CONFIGURATION] },
            },
            {
              path: "device_list",
              name: "deviceList",
              component: () => import("@/views/city/setting/deviceList.vue"),
            },
          ],
        },
        {
          path: "block",
          meta: {
            policy: [PolicyType.READ_USER],
          },
          children: [
            {
              path: "list",
              name: "blockList",
              component: () => import("@/views/block/list.vue"),
              meta: { policy: [PolicyType.READ_USER] },
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
  const store = currentUser();
  const policy: any = to.meta.policy;
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];
    const context = {
      from,
      next,
      router,
      to,
    };
    if (!store.policies || store.policies.length <= 0) {
      // if (to.name !== "login" && to.name !== "verifyCode") {
      if (
        localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken")
      ) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.reload();
      }
      // }
    } else {
      if (policy) {
        const contains = (policyMeta: string[], userRole: object) =>
          policyMeta.some((el) => el in userRole);
        const policies = Object.fromEntries(
          policy.map((key: string) => [key, true])
        );
        if (!contains(store.policies!, policies)) {
          return next({ name: "home" });
        }
      }
    }
    return middleware[0]({ ...context });
  }
  return next();
});

export default router;
