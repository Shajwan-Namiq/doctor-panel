<template>
  <div class="mt-4 taskDetail grid">
    <div class="col-12 xl:col-8">
      <div class="grid mb-6" style="width: 100% !important">
        <div
          class="col-12 md:col-6 xl:col-4 mb-2"
          v-for="(data, index) in showData"
          :key="index"
        >
          <p class="m-1">
            {{
              $t(
                `transportation.${
                  data.fieldName ?? `tasks.fields.${data.fieldData}`
                }`
              )
            }}
          </p>
          <div class="p-inputgroup">
            <Skeleton style="height: 45px" v-if="requestStatusStore.loading" />

            <span class="p-inputgroup-addon" v-if="!requestStatusStore.loading">
              <ion-icon
                :name="data.ionIcon"
                class="text-2xl"
                v-if="data.ionIcon"
              ></ion-icon>

              <i :class="`pi ${data.icon}`" v-if="data.icon"></i>
            </span>
            <span
              class="p-float-label inputData"
              v-if="!requestStatusStore.loading"
            >
              <label for="inputGroup" v-if="data.fieldData == 'duration'">{{
                convertTime(
                  data.fieldData
                    .replace(/\[|\]\.?/g, ".")
                    .split(".")
                    .filter((s) => s)
                    .reduce((acc, val) => acc && acc[val], taskDetail)
                )
              }}</label>
              <label for="inputGroup" v-else-if="data.fieldData == 'status'">{{
                $t(
                  `statuses.taskStatus.${data.fieldData
                    .replace(/\[|\]\.?/g, ".")
                    .split(".")
                    .filter((s) => s)
                    .reduce((acc, val) => acc && acc[val], taskDetail)}`
                )
              }}</label>
              <label for="inputgroup" v-else>{{
                data.fieldData
                  .replace(/\[|\]\.?/g, ".")
                  .split(".")
                  .filter((s) => s)
                  .reduce((acc, val) => acc && acc[val], taskDetail)
              }}</label>
            </span>
          </div>
        </div>
        <div class="col-12 md:col-6 xl:col-4 mb-2">
          <p class="m-1">
            {{ $t(`transportation.tasks.fields.startDate`) }}
          </p>
          <div class="p-inputgroup">
            <Skeleton style="height: 45px" v-if="requestStatusStore.loading" />

            <span class="p-inputgroup-addon" v-if="!requestStatusStore.loading">
              <ion-icon name="calendar-outline" class="text-2xl"></ion-icon>
            </span>
            <span class="p-float-label" v-if="!requestStatusStore.loading">
              <InputText
                autofocus
                id="inputgroup"
                type="text"
                :disabled="true"
              />
              <label
                for="inputgroup"
                v-if="
                  taskDetail?.taskStatusLogs?.find(
                    (x) => x.status === TripStatusEnum.WAITING
                  )?.date
                "
                >{{
                  moment(
                    taskDetail?.taskStatusLogs?.find(
                      (x) => x.status === TripStatusEnum.WAITING
                    )?.date
                  ).format("DD/MM/YYYY")
                }}
                {{
                  toLocalTimeFormat(
                    taskDetail?.taskStatusLogs?.find(
                      (x) => x.status === TripStatusEnum.WAITING
                    )?.date
                  )
                }}
              </label>
            </span>
          </div>
        </div>
        <div class="col-12 md:col-6 xl:col-4 mb-2">
          <p class="m-1">
            {{ $t(`transportation.tasks.fields.endDate`) }}
          </p>
          <div class="p-inputgroup">
            <Skeleton style="height: 45px" v-if="requestStatusStore.loading" />

            <span class="p-inputgroup-addon" v-if="!requestStatusStore.loading">
              <ion-icon name="calendar-outline" class="text-2xl"></ion-icon>
            </span>
            <span class="p-float-label" v-if="!requestStatusStore.loading">
              <InputText
                autofocus
                id="inputgroup"
                type="text"
                :disabled="true"
              />
              <label
                for="inputgroup"
                v-if="
                  taskDetail?.taskStatusLogs?.find(
                    (x) => x.status === TripStatusEnum.END
                  )?.date
                "
                >{{
                  moment(
                    taskDetail?.taskStatusLogs?.find(
                      (x) => x.status === TripStatusEnum.END
                    )?.date
                  ).format("DD/MM/YYYY")
                }}
                {{
                  toLocalTimeFormat(
                    taskDetail?.taskStatusLogs?.find(
                      (x) => x.status === TripStatusEnum.END
                    )?.date
                  )
                }}
              </label>
            </span>
          </div>
        </div>
      </div>
      <div v-if="checkIfTaskInTrip(taskDetail?.status!)">
        <div class="py-6 px-2">
          <manageTask :taskDetail="taskDetail" />
        </div>
      </div>
    </div>
    <div class="h-auto col-12 xl:col-4 mt-4 flex justify-content-center">
      <div
        class="h-auto w-full p-6"
        style="
          background-color: var(--background-color-kubak);
          border-radius: 4px;
          max-width: 500px;
        "
      >
        <div>
          <div v-for="(data, index) in showUserPriceData" :key="index">
            <div
              class="flex justify-content-between align-items-center mb-2"
              v-for="(field, index) in data.fields"
              :key="index"
            >
              <p class="text-xl">
                {{ $t(`transportation.tasks.invoice.${field}`) }}
              </p>
              <p>
                {{
                  taskDetail?.taskInvoice ? taskDetail?.taskInvoice[field] : ""
                }}
                {{ $t("transportation.common.iqd") }}
              </p>
            </div>
            <div class="splitter my-4"></div>
          </div>
          <div class="flex flex-column justify-content-end align-items-end">
            <div class="">
              <p class="text-md">
                {{ $t("transportation.tasks.invoice.total") }} :
                {{ calculateTotalPriceBeforeDiscount() }}
              </p>
            </div>
            <div class="my-2">
              <p class="text-xl">
                {{ $t("transportation.tasks.invoice.final") }} :
                {{ taskDetail?.taskInvoice?.totalTaskPrice }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import InputText from "primevue/inputtext";
import Skeleton from "primevue/skeleton";
import { requestStatus } from "@/stores/common/requestStatus";
import type { TaskDetailResult } from "@/backend/transport/";
import moment from "moment";
import { TripStatusEnum } from "@/backend/transport";
import manageTask from "./manageTask/taskStatus.vue";
import { TaskStatusEnum } from "@/backend/transport";
import { toLocalTimeFormat } from "@/composables/customRequest";
import { convertTime } from "@/composables/convertTime";

const props = defineProps(["taskDetailData"]);
const requestStatusStore = requestStatus();

const taskDetail = ref<TaskDetailResult>();
const showData = ref([
  { fieldData: "id", ionIcon: "list-outline" },
  { fieldData: "randomId", ionIcon: "list-outline" },
  {
    fieldData: "servant.firstName",
    fieldName: "servant.firstName",
    icon: "pi-id-card",
  },
  {
    fieldData: "servant.lastName",
    fieldName: "servant.lastName",
    icon: "pi-id-card",
  },
  {
    fieldData: "servant.mobile",
    fieldName: "servant.mobile",
    ionIcon: "call-outline",
  },
  { fieldData: "servant.id", fieldName: "servant.id", ionIcon: "list-outline" },
  {
    fieldData: "member.id",
    fieldName: "passenger.id",
    ionIcon: "list-outline",
  },
  {
    fieldData: "member.name",
    fieldName: "passenger.passengerName",
    icon: "pi-id-card",
  },
  {
    fieldData: "member.mobile",
    fieldName: "passenger.mobile",
    icon: "pi-phone",
  },
  { fieldData: "member.address", ionIcon: "locate-outline" },
  { fieldData: "rawPrice", ionIcon: "cash-outline" },
  { fieldData: "userPrice", ionIcon: "cash-outline" },
  { fieldData: "discountAmount", ionIcon: "gift-outline" },
  { fieldData: "tip", ionIcon: "gift-outline" },
  { fieldData: "distance", icon: "pi-directions" },
  { fieldData: "duration", ionIcon: "hourglass-outline" },
  { fieldData: "paymentType", ionIcon: "card-outline" },
  { fieldData: "originName", ionIcon: "text-outline" },
  { fieldData: "destinationName", ionIcon: "text-outline" },
  { fieldData: "requestType", icon: "pi-directions" },
  { fieldData: "status", ionIcon: "color-filter-outline" },
]);
const showUserPriceData = ref([
  {
    fields: ["paidWithBalance", "paidWithCash"],
  },
  {
    fields: ["commission", "loan"],
  },
  {
    fields: ["rawTaskPrice", "stopCompensation", "tip", "discountAmount"],
  },
]);
onMounted(async () => {
  taskDetail.value = props.taskDetailData;
  calculateTotalPriceBeforeDiscount();
});
watch(
  () => props.taskDetailData,
  () => {
    taskDetail.value = props.taskDetailData;
    calculateTotalPriceBeforeDiscount();
  }
);
function calculateTotalPriceBeforeDiscount() {
  const result =
    (taskDetail.value?.rawPrice ?? 0) +
    (taskDetail.value?.taskInvoice?.stopCompensation ?? 0) +
    (taskDetail.value?.tip ?? 0);
  taskDetail.value?.taskInvoice?.loan ?? 0;
  return result;
}
function checkIfTaskInTrip(status: TaskStatusEnum) {
  switch (status) {
    case TaskStatusEnum.ARRIVE:
    case TaskStatusEnum.START:
    case TaskStatusEnum.CONTINUE:
    case TaskStatusEnum.RESERVE:
    case TaskStatusEnum.STOP:
      return true;
    default:
      return false;
  }
}
</script>
<style lang="scss">
.taskDetail {
  max-width: 2000px;
  .p-splitter {
    border: none !important;
  }
  #mapDetailContainer {
    height: 900px;
    border-radius: 10px;
  }
  .timelineCard {
    height: 700px;
  }
  .timeLineContainer {
    position: absolute;
    bottom: 0;
    right: 0;

    padding: 30px 10px;
    pointer-events: none;
    z-index: 1000000000000000;
    background-color: var(--background-color-kubak);
    border-radius: 5px;
    .p-timeline-event-content {
      margin-top: 8px;
    }
    .p-timeline-event-opposite {
      margin-top: 8px;
    }
  }
  .splitter {
    height: 1px;
    background-color: #d6d6d6;
    width: 100%;
  }
}
.estimatedRoute {
  animation: dash 1s linear infinite;
}
</style>
