<template>
  <div class="page-style">
    <div class="page-container">
      <Splitter
        layout="vertical"
        style="background-color: var(--secondary-background-color-kubak)"
      >
        <div class="addDataComponentWrapper">
          <SplitterPanel>
            <div class="grid">
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="">
                  <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                      <ion-icon name="text-outline" class="text-2xl"></ion-icon>
                    </span>
                    <span class="p-float-label">
                      <InputText
                        autofocus
                        id="inputgroup"
                        type="text"
                        v-model="discountCodeData.code"
                        :class="{
                          'p-invalid': v$.code?.$invalid && submittedForm,
                        }"
                      />
                      <label for="inputgroup">{{
                        v$.code?.$invalid && submittedForm
                          ? $t("validationMessages.required", {
                              field: $t(
                                "transportation.discountCode.fields.code"
                              ),
                            })
                          : $t("transportation.discountCode.fields.code")
                      }}</label>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="">
                  <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                      <ion-icon
                        name="warning-outline"
                        class="text-2xl"
                      ></ion-icon>
                    </span>
                    <span class="p-float-label">
                      <InputNumber
                        autofocus
                        id="inputgroup"
                        type="text"
                        v-model="discountCodeData.usageLimit"
                        :class="{
                          'p-invalid': v$.usageLimit?.$invalid && submittedForm,
                        }"
                      />
                      <label for="inputgroup">{{
                        v$.usageLimit?.$invalid && submittedForm
                          ? $t("validationMessages.required", {
                              field: $t(
                                "transportation.discountCode.fields.usageLimit"
                              ),
                            })
                          : $t("transportation.discountCode.fields.usageLimit")
                      }}</label>
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="car-outline" class="text-2xl"></ion-icon>
                  </span>
                  <MultiSelect
                    :options="services"
                    display="chip"
                    :placeholder="$t('transportation.serviceType.name')"
                    v-model="discountCodeData.services"
                  >
                    <template #value="valueProp">
                      {{
                        valueProp.value?.length
                          ? valueProp.value.map((x) => x.title).join(" , ")
                          : valueProp.placeholder
                      }}
                    </template>
                    <template #option="slotProps">
                      <p>{{ slotProps.option.title }}</p>
                    </template>
                  </MultiSelect>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="">
                  <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                      <ion-icon
                        name="calendar-outline"
                        class="text-2xl"
                      ></ion-icon>
                    </span>
                    <span class="p-float-label">
                      <Calendar
                        showTime
                        hourFormat="24"
                        autofocus
                        id="inputgroup"
                        type="text"
                        v-model="discountCodeData.startAt"
                        :class="{
                          'p-invalid': v$.startAt?.$invalid && submittedForm,
                        }"
                        dateFormat="dd/mm/yy"
                        showSeconds
                      />
                      <label for="inputgroup">{{
                        v$.startAt?.$invalid && submittedForm
                          ? $t("validationMessages.required", {
                              field: $t("fields.startAt"),
                            })
                          : $t("fields.startAt")
                      }}</label>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="">
                  <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                      <ion-icon
                        name="calendar-outline"
                        class="text-2xl"
                      ></ion-icon>
                    </span>
                    <span class="p-float-label">
                      <Calendar
                        showTime
                        hourFormat="24"
                        autofocus
                        id="inputgroup"
                        type="text"
                        v-model="discountCodeData.expireAt"
                        :class="{
                          'p-invalid': v$.expireAt?.$invalid && submittedForm,
                        }"
                        showSeconds
                      />
                      <label for="inputgroup">{{
                        v$.expireAt?.$invalid && submittedForm
                          ? $t("validationMessages.required", {
                              field: $t("fields.expireAt"),
                            })
                          : $t("fields.expireAt")
                      }}</label>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="calculator-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <Dropdown
                      optionLabel="name"
                      :options="discountType"
                      v-model="discountCodeData.type"
                      :class="{
                        'p-invalid': v$.type?.$invalid && submittedForm,
                      }"
                    >
                      <template #value="slotProps">
                        <div>
                          <div>
                            {{
                              slotProps.value
                                ? $t(
                                    `transportation.discountCode.fields.type.${slotProps.value}`
                                  )
                                : v$.type?.$invalid && submittedForm
                                ? $t("validationMessages.required", {
                                    field: $t(
                                      "transportation.discountCode.fields.type.type"
                                    ),
                                  })
                                : $t(
                                    `transportation.discountCode.fields.type.type`
                                  )
                            }}
                          </div>
                        </div>
                      </template>
                      <template #option="slotProps">
                        {{
                          $t(
                            `transportation.discountCode.fields.type.${slotProps.option}`
                          )
                        }}
                      </template>
                    </Dropdown>
                  </span>
                </div>
              </div>

              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon
                      name="calculator-outline"
                      class="text-2xl"
                    ></ion-icon>
                  </span>
                  <span class="p-float-label">
                    <Dropdown
                      optionLabel="name"
                      :options="discountStepTypeFrame"
                      v-model="discountCodeData.stepTimeFrame"
                    >
                      <template #value="slotProps">
                        <div>
                          <div>
                            {{
                              $t(
                                `transportation.discountCode.fields.type.${slotProps.value}`
                              )
                            }}
                          </div>
                        </div>
                      </template>
                      <template #option="slotProps">
                        {{
                          $t(
                            `transportation.discountCode.fields.type.${slotProps.option}`
                          )
                        }}
                      </template>
                    </Dropdown>
                  </span>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="earth-outline" class="text-2xl"></ion-icon>
                  </span>
                  <Dropdown
                    optionLabel="name"
                    :options="isHiddenOptions"
                    v-model="discountCodeData.isHidden"
                    :class="{
                      'p-invalid': v$.isHidden?.$invalid && submittedForm,
                    }"
                  >
                    <template #value="slotProps">
                      <div>
                        <div>
                          {{
                            slotProps.value != undefined
                              ? $t(
                                  `transportation.discountCode.fields.isHidden.${slotProps.value}`
                                )
                              : v$.isHidden?.$invalid && submittedForm
                              ? $t("validationMessages.required", {
                                  field: $t(
                                    "transportation.discountCode.fields.isHidden.isHidden"
                                  ),
                                })
                              : $t(
                                  `transportation.discountCode.fields.isHidden.isHidden`
                                )
                          }}
                        </div>
                      </div>
                    </template>
                    <template #option="slotProps">
                      {{
                        $t(
                          `transportation.discountCode.fields.isHidden.${slotProps.option}`
                        )
                      }}
                    </template>
                  </Dropdown>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <ion-icon name="ban-outline" class="text-2xl"></ion-icon>
                  </span>
                  <Dropdown
                    optionLabel="name"
                    :options="disabledOptions"
                    v-model="discountCodeData.disabled"
                    :class="{
                      'p-invalid': v$.disabled?.$invalid && submittedForm,
                    }"
                  >
                    <template #value="slotProps">
                      <div>
                        <div>
                          {{
                            slotProps.value != undefined
                              ? $t(
                                  `transportation.discountCode.fields.disabled.${slotProps.value}`
                                )
                              : v$.disabled?.$invalid && submittedForm
                              ? $t("validationMessages.required", {
                                  field: $t(
                                    "transportation.discountCode.fields.disabled.disabled"
                                  ),
                                })
                              : $t(
                                  `transportation.discountCode.fields.disabled.disabled`
                                )
                          }}
                        </div>
                      </div>
                    </template>
                    <template #option="slotProps">
                      {{
                        $t(
                          `transportation.discountCode.fields.disabled.${slotProps.option}`
                        )
                      }}
                    </template>
                  </Dropdown>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <SearchUserComponent
                  @selectedUsers="
                    (selectedUsers) => {
                      discountCodeData.users = selectedUsers;
                    }
                  "
                />
              </div>
            </div>
          </SplitterPanel>
          <SplitterPanel>
            <div class="py-2">
              <p class="text-lg">
                {{ $t("transportation.discountCode.addStepsTitle") }}
              </p>
            </div>
            <div class="grid">
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="">
                  <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                      <ion-icon name="cash-outline" class="text-2xl"></ion-icon>
                    </span>
                    <span class="p-float-label">
                      <InputNumber
                        autofocus
                        id="inputgroup"
                        type="text"
                        v-model="stepsData.value"
                        :class="{
                          'p-invalid': sv$.value?.$invalid && addedStep,
                        }"
                      />
                      <label for="inputgroup">{{
                        sv$.value?.$invalid && addedStep
                          ? $t("validationMessages.required", {
                              field: $t(
                                $t(
                                  "transportation.discountCode.fields.steps.value"
                                )
                              ),
                            })
                          : $t("transportation.discountCode.fields.steps.value")
                      }}</label>
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4"
                v-if="discountCodeData.type == 'Percent'"
              >
                <div class="">
                  <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                      <ion-icon
                        name="warning-outline"
                        class="text-2xl"
                      ></ion-icon>
                    </span>
                    <span class="p-float-label">
                      <InputNumber
                        autofocus
                        id="inputgroup"
                        type="text"
                        v-model="stepsData.max"
                        :class="{
                          'p-invalid': sv$.max?.$invalid && addedStep,
                        }"
                      />
                      <label for="inputgroup">{{
                        sv$.max?.$invalid && addedStep
                          ? $t("validationMessages.required", {
                              field: $t(
                                $t(
                                  "transportation.discountCode.fields.steps.max"
                                )
                              ),
                            })
                          : $t("transportation.discountCode.fields.steps.max")
                      }}</label>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <div class="">
                  <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                      <ion-icon
                        name="repeat-outline"
                        class="text-2xl"
                      ></ion-icon>
                    </span>
                    <span class="p-float-label">
                      <InputNumber
                        autofocus
                        id="inputgroup"
                        type="text"
                        v-model="stepsData.repeat"
                      />
                      <label for="inputgroup">{{
                        $t("transportation.discountCode.fields.steps.repeat")
                      }}</label>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-4 md:col-1 mb-4">
                <Button
                  class="p-button-secondary p-button-outlined"
                  icon="pi pi-plus"
                  @click="addSteps"
                >
                </Button>
              </div>
            </div>

            <div style="max-width: 101rem" v-if="steps.length > 0">
              <DataTable :value="steps" responsiveLayout="scroll">
                <Column
                  field="step"
                  :header="$t('transportation.discountCode.fields.steps.step')"
                ></Column>
                <Column
                  field="value"
                  :header="$t('transportation.discountCode.fields.steps.value')"
                ></Column>
                <Column
                  v-if="discountCodeData.type == 'Percent'"
                  field="max"
                  :header="$t('transportation.discountCode.fields.steps.max')"
                ></Column>
                <Column>
                  <template #body="slotProps">
                    <Button
                      icon="pi pi-times"
                      class="p-button-secondary"
                      @click="deleteStep(slotProps.data.Step)"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
            <div
              class="w-full flex justify-content-center"
              v-if="discountCodeData.steps.length < 1 && submittedForm"
            >
              <Message severity="error" class="w-full xl:w-8" :closable="false">
                {{ $t("validationMessages.discount_steps_required") }}
              </Message>
            </div>
            <div class="flex justify-content-end my-4">
              <!-- <Button
                type="button"
                class="p-button-secondary p-button-outlined mx-2"
                :label="$t('buttons.cancel')"
                icon="pi pi-times-circle"
              /> -->
              <Button
                :loading="requestStatusStore.loading"
                :label="$t('buttons.submit')"
                @click="submitData"
                icon="pi pi-check-circle"
              />
            </div>
          </SplitterPanel>
          <SplitterPanel>
            <div
              class="w-full flex justify-content-center"
              v-if="creatingShapeError"
            >
              <Message severity="error" class="w-full xl:w-8" :closable="false">
                {{ $t("validationMessages.one_shape_allow") }}
              </Message>
            </div>
            <div id="addDiscountAreaMap">
              <div
                class="deleteShapeContainer"
                v-if="showDeleteShape"
                @click="deleteShape"
              >
                <ion-icon name="trash-outline" class="text-lg"></ion-icon>
              </div>
            </div>
          </SplitterPanel>
        </div>
      </Splitter>
    </div>
  </div>
</template>
<script setup lang="ts">
import { requestStatus } from "@/stores/common/requestStatus";
import { required } from "@vuelidate/validators";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import { onMounted, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import SplitterPanel from "primevue/splitterpanel";
import Splitter from "primevue/splitter";
import { useRouter } from "vue-router";
import {
  DiscountCodeService,
  DiscountStepTimeFrame,
  DiscountType,
  type ServiceDto,
} from "@/backend/transport";
import { endOfToday, startOfToday } from "@/composables/customRequest";
import L from "leaflet";
import "leaflet-draw";
import Message from "primevue/message";
import { DiscountCodeTypeEnum } from "@/common/models/transportation/discountCodeTypeEnum";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import { MonitoringStore } from "@/views/transportation/support/monitoring/monitoringStore";
import { currentUser } from "@/stores/currentUser";
import {
  createMapperForCreateAndUpdateDiscountCode,
  type CreateAndUpdateDiscountCodeDto,
} from "./mapper";
import { ServiceStore } from "@/stores/common/service";
import SearchUserComponent from "@/components/searchUserDropdown.vue";
import { PolicyType } from "@/backend/transport";
import { ifUserHasPolicy } from "@/composables/checkUserPolicy";

const currentUserStore = currentUser();
const monitoringStore = MonitoringStore();
const toast = toastStore();
const { t } = useI18n();

// return service data
const serviceStore = ServiceStore();
const services = ref<ServiceDto[]>();
serviceStore.getAllServices().then((res) => {
  services.value = res;
});

const submittedForm = ref<boolean>(false);
const addedStep = ref<boolean>(false);
const requestStatusStore = requestStatus();
const rules: any = {
  code: { required },
  steps: {},
  type: { required },
  startAt: { required },
  expireAt: { required },
  isHidden: { required },
  disabled: { required },
};
const stepsRules = {
  value: { required },
  repeat: { required },
};
const stepsData = ref<{
  value: number | undefined;
  repeat: number | undefined;
  max: number | undefined;
}>({
  value: undefined,
  repeat: 1,
  max: undefined,
});
const steps = ref<
  {
    step: number;
    value: number;
    max: number;
  }[]
>([]);
const discountType = Object.keys(DiscountCodeTypeEnum).map(
  (key) => DiscountCodeTypeEnum[key]
);

const discountStepTypeFrame = Object.keys(DiscountStepTimeFrame).map(
  (key) => DiscountStepTimeFrame[key]
);

const isHiddenOptions = ref([true, false]);
const disabledOptions = ref([true, false]);

const discountCodeData = ref<CreateAndUpdateDiscountCodeDto>({
  code: "",
  type: DiscountType.PERCENT,
  steps: [],
  services: undefined,
  usageLimit: null,
  startAt: new Date(startOfToday),
  expireAt: new Date(endOfToday),
  isHidden: undefined,
  disabled: undefined,
  users: undefined,
  stepTimeFrame: DiscountStepTimeFrame.ANY_TIME,
});
const showDeleteShape = ref(false);
const v$ = useVuelidate(rules, discountCodeData);
const sv$ = useVuelidate(stepsRules, stepsData);
const router = useRouter();
const creatingShapeError = ref(false);
onMounted(() => {
  mapRender();
});
let map;
const tileLayer = ref(
  monitoringStore.mapTileURL ??
    "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYm5hcjk4IiwiYSI6ImNsMXg4b2dqejAwYnMzam1rbTMwcm92MWMifQ.iMLMmdcJpStBNXCOHSWE2A"
);
let drawnItems: any = new L.FeatureGroup();
const drawOptions = {
  draw: {
    circle: false,
    polyline: false,
    polygon: true,
    rectangle: false,
    marker: false,
    circlemarker: false,
  },
  edit: {
    remove: false,
    featureGroup: drawnItems,
  },
};
const drawControl = new (L.Control as any).Draw(drawOptions);
function mapRender() {
  map = L.map("addDiscountAreaMap").setView(
    [
      currentUserStore?.userInfo?.region?.location?.lat ?? 35.564558,
      currentUserStore?.userInfo?.region?.location?.lng ?? 45.437937,
    ],
    12
  );
  drawnItems = L.featureGroup().addTo(map);

  L.tileLayer(tileLayer.value, {
    subdomains: ["a", "b"],
    maxZoom: 18,
    id: "cl5z8606q002o14odi8ee3hjr",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiYm5hcjk4IiwiYSI6ImNsMXg4b2dqejAwYnMzam1rbTMwcm92MWMifQ.iMLMmdcJpStBNXCOHSWE2A",
  }).addTo(map);
  map.addControl(drawControl);
  map.on("draw:drawstart", startDraw);
}
function startDraw() {
  creatingShapeError.value = false;
  if (Object.keys(drawnItems._layers).length > 0) {
    map.off("draw:created", createShape);
    creatingShapeError.value = true;
    return;
  } else {
    map.on("draw:created", createShape);
  }
}
function createShape(e) {
  const layer = e.layer;
  discountCodeData.value.redeemBoundary = layer._latlngs[0];
  drawnItems.addLayer(e.layer);
  showDeleteShape.value = true;
}
function deleteShape() {
  creatingShapeError.value = false;
  drawnItems.clearLayers();
  showDeleteShape.value = false;
  delete discountCodeData.value.redeemBoundary;
}
function submitData() {
  submittedForm.value = true;
  discountCodeData.value.steps = steps.value;
  if (discountCodeData.value.steps?.length < 1) return;
  if (!v$.value.$invalid) {
    DiscountCodeService.createDiscountCode({
      requestBody: createMapperForCreateAndUpdateDiscountCode(
        discountCodeData.value
      ),
    }).then(() => {
      toast.changeToastState({
        severity: t("toasts.added_success_header"),
        summary: t("toasts.added_success_desc", {
          field: t("fields.discount"),
        }),
        type: "success",
      });
      router.push({
        name: "transportationListDiscountCode",
      });
    });
  }
}
function addSteps() {
  addedStep.value = true;
  if (!sv$.value.$invalid) {
    for (let i = 0; i < stepsData.value.repeat!; i++) {
      steps.value.push({
        value: stepsData.value.value!,
        step: steps.value!.length + 1,
        max: stepsData.value.max!,
      });
    }
  }
}

function deleteStep(step: number) {
  steps.value!.splice(step - 1, 1);
  for (const index in steps.value) {
    steps.value[index].step = +index + 1;
  }
}
</script>
<style lang="scss">
.addDataComponentWrapper {
  background-color: var(--secondary-background-color-kubak);
  padding-bottom: 20px;
  border-radius: 5px;
}
#addDiscountAreaMap {
  height: 500px;
  width: 100%;
  .deleteShapeContainer {
    height: 33px;
    width: 33px;
    background-color: white;
    position: absolute;
    z-index: 10000;
    margin: 180px 0 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border: 1px solid gray;
    &:hover {
      cursor: pointer;
      background-color: #f4f4f4;
    }
  }
}
</style>
