<template>
  <div class="">
    <div class="mb-2 -mt-2 flex justify-content-end">
      <Button
        icon="pi pi-info-circle"
        class="p-button-secondary"
        @click="taskDetail"
      />
    </div>
    <div class="grid px-4">
      <div
        class="flex flex-column mb-4 col-3"
        v-for="(field, index) in taskDetailField"
        :key="index"
      >
        <div class="flex align-items-center">
          <ion-icon
            :name="`${field.icon}-outline`"
            class="text-xl mx-1"
            style="color: #35b368"
          ></ion-icon>
          <h4>{{ $t(`transportation.monitoring.${field.label}`) }}</h4>
        </div>
        <p class="mx-3">{{ task[field.label] }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { MonitoringStore } from "../monitoringStore";
import {
  PaymentType,
  RequestType,
  TripStatusEnum,
  type TripStatusDetail,
} from "@/backend/transport";
import { useRouter } from "vue-router";

const props = defineProps(["taskDetail"]);
const task = ref<TripStatusDetail>({
  destinationLocationName: "",
  discountedPrice: 0,
  rawPrice: 0,
  paymentType: PaymentType.CASH,
  sourceLocationName: "",
  taskType: RequestType.WITH_DESTINATION,
  tripStatus: TripStatusEnum.ACCEPTED,
  discountName: "",
  taskId: 0,
});
const router = useRouter();
addTaskDetail();
watch(
  () => props.taskDetail,
  () => {
    addTaskDetail();
  },
  { deep: true }
);

function addTaskDetail() {
  for (const field in props.taskDetail) {
    if (task.value.hasOwnProperty(field)) {
      task.value[field] = props.taskDetail[field];
    }
  }
}

const taskDetailField = ref([
  {
    label: "destinationLocationName",
    icon: "time",
  },
  {
    label: "discountedPrice",
    icon: "cash",
  },
  {
    label: "rawPrice",
    icon: "speedometer",
  },
  {
    label: "paymentType",
    icon: "location",
  },
  {
    label: "sourceLocationName",
    icon: "map",
  },
  {
    label: "taskType",
    icon: "locate",
  },
  {
    label: "tripStatus",
    icon: "card",
  },
  {
    label: "discountName",
    icon: "card",
  },
]);
function taskDetail() {
  router.push({
    name: "detailTask",
    params: {
      id: task.value.taskId,
    },
  });
}
</script>
<style lang="scss">
.info {
  flex-wrap: nowrap;
}
</style>
