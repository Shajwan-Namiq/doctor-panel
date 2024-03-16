<template>
  <div class="page-style" @keyup.enter="getReportProblems">
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
                      v-model="filterData.fromDate"
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
                      v-model="filterData.toDate"
                      showTime
                      showSeconds
                    />
                    <label for="inputgroup">{{
                      $t("transportation.common.endDate")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="business-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    :options="regions"
                    display="chip"
                    :placeholder="$t('auth.area.regions')"
                    v-model="filterData.region"
                  >
                    <template #value="valueProp">
                      {{ valueProp.value?.name ?? valueProp.placeholder }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{ slotProps.option.name }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="business-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <Dropdown
                    :options="services"
                    display="chip"
                    :placeholder="$t('transportation.serviceType.name')"
                    v-model="filterData.service"
                  >
                    <template #value="valueProp">
                      {{ valueProp.value?.title ?? valueProp.placeholder }}
                    </template>
                    <template #option="slotProps">
                      <p>
                        {{ slotProps.option.title }}
                      </p>
                    </template>
                  </Dropdown>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="search-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputNumber
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="filterData.taskRandomId"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.tasks.fields.randomId")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="search-outline" class="text-2xl"></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <InputNumber
                      autofocus
                      id="inputgroup"
                      type="text"
                      v-model="filterData.taskId"
                    />
                    <label for="inputgroup">{{
                      $t("transportation.tasks.fields.id")
                    }}</label>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <SearchUserComponent
                  @selectedUser="
                    (selectedUser) => {
                      filterData.user = selectedUser;
                    }
                  "
                  :singleUser="true"
                />
              </div>
            </div>
            <div class="mb-3 flex justify-content-end">
              <Button
                icon="pi pi-times"
                :label="$t('buttons.clear')"
                class="mx-2 p-button-secondary"
              />
              <Button
                icon="pi pi-filter"
                :label="$t('buttons.filter')"
                @click="getReportProblems"
                :loading="requestStatusStore.loading"
              />
            </div>
          </div>
        </Transition>
        <div>
          <DataTable
            class="cardTable"
            :value="reportList?.items"
            responsiveLayout="scroll"
            :lazy="true"
            :loading="requestStatusStore.loading"
            :paginator="true"
            :rows="reportList?.limit ?? 10"
            :totalRecords="reportList?.count"
            :currentPageReportTemplate="
              $t('table.paginator', {
                first: '{first}',
                last: '{last}',
                totalRecords: '{totalRecords}',
              })
            "
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport "
            @page="paginate"
          >
            <template #header>
              {{ $t("transportation.reports.taskReport.title") }}
            </template>

            <Column
              :header="$t('transportation.reports.taskReport.taskRandomId')"
            >
              <template #body="slotProps">
                <div
                  class="w-full h-full cursor-pointer"
                  @click="gotoTaskPage(slotProps.data.taskId)"
                >
                  {{ slotProps.data.taskId }}
                </div>
              </template>
            </Column>
            <Column
              :header="$t('transportation.reports.taskReport.reporterName')"
            >
              <template #body="slotProps">
                {{ slotProps.data.reporterName }}
              </template>
            </Column>
            <Column :header="$t('transportation.reports.taskReport.comment')">
              <template #body="slotProps">
                <div style="max-width: 400px; overflow: auto">
                  {{ slotProps.data.comment }}
                </div>
              </template>
            </Column>
            <Column :header="$t('transportation.reports.isCloser.title')">
              <template #body="slotProps">
                <div
                  class="w-5rem py-2 flex justify-content-center border-round-lg"
                  :style="`background-color:${
                    slotProps.data.isClosed
                      ? 'var(--success-button)'
                      : 'var(--warn-button)'
                  } !important`"
                >
                  {{
                    slotProps.data.isClosed
                      ? $t("transportation.reports.isClosed.true")
                      : $t("transportation.reports.isClosed.false")
                  }}
                </div>
              </template>
            </Column>
            <Column :header="$t('transportation.reports.taskReport.problem')">
              <template #body="slotProps">
                <div class="flex">
                  <div
                    class="flex justify-content-center align-items-center p-2 mx-1 border-round-lg"
                    style="background-color: var(--icon-background-color-kubak)"
                    v-for="(name, index) in slotProps.data.problems"
                    :key="index"
                  >
                    <p class="text-sm" v-if="index < 5">
                      {{ name?.translations[0]?.name }}
                    </p>
                  </div>
                </div>
              </template>
            </Column>
            <Column :header="$t('fields.role')">
              <template #body="slotProps">
                {{ slotProps.data.role }}
              </template>
            </Column>
            <Column :header="$t('transportation.common.date')">
              <template #body="slotProps">
                {{ toLocale(slotProps.data.taskReportDate) }}
              </template>
            </Column>
            <Column>
              <template #body="slotProps">
                <Button
                  icon="pi pi-info"
                  class="p-button-primary mb-4 addButton"
                  @click="getDetail(slotProps.data)"
                />
              </template>
            </Column>
            <template #footer> </template>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  TaskReportService,
  type ListTaskReportResultPagination,
  type RegionDto,
  type ServiceDto,
} from "@/backend/transport";
import { onMounted, ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import { useRouter } from "vue-router";
import {
  createMapTaskReportFilterDtoToTaskFilter,
  type TaskReportsFilterDto,
} from "./mapper";
import Calendar from "primevue/calendar";
import { RegionStore } from "@/stores/common/region";
import { ServiceStore } from "@/stores/common/service";
import SearchUserComponent from "@/components/searchUserDropdown.vue";
import { toLocale } from "@/composables/dateTimeFormat";

const reportList = ref<ListTaskReportResultPagination>();
const requestStatusStore = requestStatus();
const router = useRouter();

const regionStore = RegionStore();
const regions = ref<RegionDto[]>();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});

const serviceStore = ServiceStore();
const services = ref<ServiceDto[]>();
serviceStore.getAllServices().then((res) => {
  services.value = res;
});

const filterData = ref<TaskReportsFilterDto>({
  closed: undefined,
  fromDate: undefined,
  toDate: undefined,
  region: undefined,
  servant: undefined,
  user: undefined,
  taskId: undefined,
  taskRandomId: undefined,
  service: undefined,
  sortDescending: true,
});

onMounted(async () => {
  await getReportProblems();
});
async function getReportProblems() {
  TaskReportService.listTaskReports(
    createMapTaskReportFilterDtoToTaskFilter(filterData.value)
  ).then((response) => {
    reportList.value = response;
  });
}

function getDetail(data) {
  // open this page in new tab
  const routeData = router.resolve({
    name: "taskReportDetail",
    params: { id: data.id },
  });

  window.open(routeData.href, "_blank");
}

function gotoTaskPage(taskId) {
  router.push({
    name: "detailTask",
    params: { id: taskId },
  });
}
function paginate(event) {
  filterData.value.page = event.page;
  getReportProblems();
}
</script>
