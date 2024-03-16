<template>
  <div class="page-style" @keyup.enter="search">
    <div class="page-container">
      <div class="toggleFilterAnimation">
        <Transition name="slide-down">
          <div>
            <div class="grid">
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="calendar-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <Calendar
                      dateFormat="dd-mm-yy"
                      v-model="filterData.startAt"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.startDate")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="calendar-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <Calendar
                      dateFormat="dd-mm-yy"
                      v-model="filterData.endAt"
                      :class="{
                        'p-invalid': filterData.startAt! > filterData.endAt!,
                      }"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup"
                      >{{
                        filterData.startAt! > filterData.endAt!
                          ? $t(
                              "validationMessages.end_date_must_greater_than_start_date"
                            )
                          : $t("transportation.common.endDate")
                      }}
                      {{ $t("transportation.common.endDate") }}
                    </label>
                  </span>
                </div>
              </div>
            </div>
            <div class="mb-3 flex justify-content-end">
              <Button
                :label="$t('buttons.clear')"
                class="mx-2 p-button-secondary"
                @click="clearData"
                icon="pi pi-times"
              />
              <Button
                :label="$t('buttons.filter')"
                @click="search"
                :loading="requestStatusStore.loading"
                :disabled="filterData.startAt! > filterData.endAt!"
                icon="pi pi-filter"
              />
            </div>
          </div>
        </Transition>
      </div>
      <div class="">
        <div class="pb-4 dynamicTableComponent">
          <DataTable
            :loading="requestStatusStore.loading || !notification"
            :value="notification?.items"
            responsiveLayout="scroll"
            :paginator="true"
            :rows="notification?.limit"
            :totalRecords="notification?.count"
            :lazy="true"
            :currentPageReportTemplate="
              $t('table.paginator', {
                first: '{first}',
                last: '{last}',
                totalRecords: '{totalRecords}',
              })
            "
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
            @page="paginate"
            style="min-height: 300px"
          >
            <Column style="max-width: 30rem">
              <template #body="slotProps">
                <div
                  class="w-full flex justify-content-center"
                  v-if="slotProps?.data?.messages[0]?.imageUrl"
                >
                  <img
                    :src="getImage(slotProps?.data?.messages[0]?.imageUrl)"
                    class="h-6rem w-6rem border-round-lg"
                  />
                </div>
              </template>
            </Column>
            <Column :header="$t('notification.title')" style="max-width: 30rem">
              <template #body="slotProps">
                {{ slotProps?.data?.messages[0]?.title }}
              </template>
            </Column>
            <Column
              :header="$t('notification.description')"
              style="max-width: 30rem"
            >
              <template #body="slotProps">
                {{ slotProps?.data?.messages[0].description }}
              </template>
            </Column>
            <Column :header="$t('transportation.common.sendDate')">
              <template #body="slotProps">
                <div>
                  <div>
                    {{
                      moment(toLocaleDateFormat(slotProps?.data?.date)).format(
                        "DD/MM/YYYY"
                      )
                    }}
                  </div>
                  <div class="mt-1">
                    {{
                      moment(toLocaleDateFormat(slotProps?.data?.date)).format(
                        "HH:mm:ss"
                      )
                    }}
                  </div>
                </div>
              </template>
            </Column>

            <Column :header="$t('transportation.common.expirationDate')">
              <template #body="slotProps">
                <div>
                  <div>
                    {{
                      slotProps?.data?.expirationDate
                        ? moment(
                            toLocaleDateFormat(slotProps?.data?.expirationDate)
                          ).format("DD/MM/YYYY")
                        : ""
                    }}
                  </div>
                  <div class="mt-1">
                    {{
                      slotProps?.data?.expirationDate
                        ? moment(
                            toLocaleDateFormat(slotProps?.data?.expirationDate)
                          ).format("HH:mm:ss")
                        : ""
                    }}
                  </div>
                </div>
              </template>
            </Column>

            <!-- return status and scheduling -->
            <Column :header="$t('transportation.common.scheduledTo')">
              <template #body="slotProps">
                <div>
                  <div>
                    {{
                      slotProps?.data?.scheduledTo
                        ? moment(
                            toLocaleDateFormat(slotProps?.data?.scheduledTo)
                          ).format("DD/MM/YYYY")
                        : ""
                    }}
                  </div>
                  <div>
                    {{
                      slotProps?.data?.scheduledTo
                        ? moment(
                            toLocaleDateFormat(slotProps?.data?.scheduledTo)
                          ).format("HH:mm:ss")
                        : ""
                    }}
                  </div>
                </div>
              </template>
            </Column>

            <Column :header="$t('transportation.common.status')">
              <template #body="slotProps">
                <div
                  v-if="
                    slotProps?.data?.status !==
                    PanelPushNotificationStatus.WAITING
                  "
                  :style="getStatusStyle(slotProps?.data?.status)"
                  class="w-5rem p-2 flex justify-content-center align-items-center"
                >
                  {{ slotProps?.data?.status }}
                </div>
                <div
                  v-else
                  :style="getStatusStyle(slotProps?.data?.status)"
                  class="w-5rem p-2 flex justify-content-center align-items-center"
                >
                  {{ slotProps?.data?.status }}
                </div>
              </template>
            </Column>

            <Column>
              <template #body="slotProps">
                <div class="flex">
                  <div
                    style="
                      background-color: var(--success-button);
                      border-bottom-left-radius: 4px;
                      border-top-left-radius: 4px;
                      color: white;
                    "
                    class="w-4rem p-2 flex justify-content-center align-items-center"
                  >
                    {{ slotProps.data.successCount }}
                  </div>
                  <div
                    style="
                      background-color: var(--danger-button);
                      border-bottom-right-radius: 4px;
                      border-top-right-radius: 4px;
                      color: white;
                    "
                    class="w-4rem p-2 flex justify-content-center align-items-center"
                  >
                    {{ slotProps.data.failureCount }}
                  </div>
                </div>
              </template>
            </Column>

            <Column>
              <template #body="slotProps">
                <!-- v-can="[BasePolicy.SEND_PUSH_NOTIFICATION]"  -->
                <Button
                  v-if="
                    slotProps?.data?.status !==
                    PanelPushNotificationStatus.WAITING
                  "
                  @click="detail(slotProps.data)"
                  style="width: auto !important"
                  severity="secondary"
                >
                  <ion-icon name="send-outline" class="mx-1"></ion-icon>
                  {{ $t("buttons.resend") }}
                </Button>
                <Button
                  v-else
                  @click="changeStatus(slotProps.data)"
                  style="width: auto !important"
                  severity="danger"
                >
                  <i class="pi pi-times mx-1" style="font-size: 1rem"></i>
                  {{ $t("buttons.cancel") }}
                </Button>
              </template>
            </Column>

            <template #empty>
              <div
                class="w-full flex justify-content-center flex-column align-items-center py-6"
                v-if="!requestStatusStore.loading && notification"
              >
                <img
                  src="@/static/images/empty.png"
                  style="height: 80px; width: 150px"
                />

                <h3 class="mt-3">{{ $t("reusables.emptyRecordHeader") }}</h3>
                <p>{{ $t("reusables.emptyRecordDesc") }}</p>
              </div>
            </template>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from "primevue/button";
import { ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import { RegionStore } from "@/stores/common/region";
import Calendar from "primevue/calendar";
import { endOfToday, startOfToday } from "@/composables/customRequest";
import type { RegionDto } from "@/backend/auth/models/RegionDto";
import {
  PanelPushNotificationStatus,
  type PushNotificationLogDtoPagination,
} from "@/backend/city";
import { PushNotificationService } from "@/backend/city/services/PushNotificationService";
import moment from "moment";
import { getImage } from "@/composables/getImage";
import { useRouter } from "vue-router";
// import { BasePolicy } from "@/backend/auth";
import {
  NotificationListFilterDto,
  mapNotificationListFilterDtoToRequest,
} from "./mapper";
import { toLocaleDateFormat } from "@/composables/dateTimeFormat";

// navigate to detail page
const router = useRouter();
function detail(data) {
  router.push({
    name: "citySendNotification",
    query: {
      id: data.id,
    },
  });
}

const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});
const requestStatusStore = requestStatus();

const notification = ref<PushNotificationLogDtoPagination>();
const filterData = ref<NotificationListFilterDto>({
  startAt: new Date(startOfToday),
  endAt: new Date(endOfToday),
  sortField: "id",
  sortDescending: true,
});

getAllNotification();
async function getAllNotification() {
  await PushNotificationService.getNotifications(
    mapNotificationListFilterDtoToRequest(filterData.value)
  )
    .then((res) => {
      notification.value = res;
    })
    .catch(() => {
      notification.value = {};
    });
}

function search() {
  getAllNotification();
}

function clearData() {
  filterData.value = {
    startAt: new Date(startOfToday),
    endAt: new Date(endOfToday),
    sortField: "id",
    sortDescending: true,
  };
}
function paginate(event) {
  filterData.value.page = event.page;
  getAllNotification();
}

async function changeStatus(data) {
  await PushNotificationService.postCancelScheduledPanelPushNotification({
    id: data.id,
  });
  getAllNotification();
}

// change the color by depend changing status
function getStatusStyle(status) {
  switch (status) {
    case PanelPushNotificationStatus.SENT:
      return {
        "background-color": "var(--success-button)",
        "border-radius": "4px",
        color: "white",
      };
    case PanelPushNotificationStatus.CANCELED:
      return {
        "background-color": "var(--danger-color-kubak)",
        "border-radius": "4px",
        color: "white",
      };
    case PanelPushNotificationStatus.FAILED:
      return {
        "background-color": "var(--danger-button)",
        "border-radius": "4px",
        color: "white",
      };
    case PanelPushNotificationStatus.WAITING:
      return {
        "background-color": "var(--warn-button)",
        "border-radius": "4px",
        color: "white",
      };
  }
}
</script>
<style lang="scss"></style>
