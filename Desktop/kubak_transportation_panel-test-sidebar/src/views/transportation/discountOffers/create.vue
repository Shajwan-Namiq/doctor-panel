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
                        v-model="discountOffersData.usageLimit"
                      />
                      <label for="inputgroup">{{
                        $t("transportation.discountCode.fields.usageLimit")
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
                    v-model="discountOffersData.services"
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
                        v-model="discountOffersData.startFrom"
                        :class="{
                          'p-invalid': v$.startFrom.$invalid && submittedForm,
                        }"
                        dateFormat="dd/mm/yy"
                        showSeconds
                      />
                      <label for="inputgroup">
                        {{
                          v$.startFrom.$invalid && submittedForm
                            ? $t("validationMessages.required", {
                                field: $t("fields.startAt"),
                              })
                            : $t("fields.startAt")
                        }}
                      </label>
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
                        autofocus
                        id="inputgroup"
                        type="text"
                        v-model="discountOffersData.validUntil"
                        dateFormat="dd/mm/yy"
                        showTime
                        showSeconds
                      />
                      <label for="inputgroup">{{ $t("fields.toDate") }}</label>
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
                      v-model="discountOffersData.type"
                      :class="{
                        'p-invalid': v$.type?.$invalid && submittedForm,
                      }"
                    >
                      <template #value="slotProps">
                        <div>
                          {{
                            slotProps.value
                              ? $t(
                                  `transportation.discountCode.fields.type.${slotProps.value}`
                                )
                              : v$.type?.$invalid && submittedForm
                              ? $t("validationMessages.required", {
                                  filed: $t(
                                    "transportation.discountCode.fields.type.type"
                                  ),
                                })
                              : $t(
                                  `transportation.discountCode.fields.type.type`
                                )
                          }}
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
                      v-model="discountOffersData.continueBeyondFinalStep"
                      :options="continueBeyondFinalStepOptions"
                      option-label="label"
                      option-value="value"
                    >
                      <!-- Custom template for displaying the selected value -->
                      <template #value="slotProps">
                        <div>
                          {{
                            slotProps.value !== null
                              ? $t(
                                  `transportation.discountOffers.fields.continueBeyondFinalStep.${slotProps.value}`
                                )
                              : $t(
                                  "transportation.discountOffers.fields.continueBeyondFinalStep.select"
                                )
                          }}
                        </div>
                      </template>

                      <template #option="slotProps">
                        {{
                          $t(
                            `transportation.discountOffers.fields.continueBeyondFinalStep.${slotProps.option.value}`
                          )
                        }}
                      </template>
                    </Dropdown>
                  </span>
                </div>
              </div>

              <div class="col-12 md:col-6 lg:col-4 xl:col-3 mb-4">
                <SearchUserComponent
                  @selectedUsers="
                    (selectedUsers) => {
                      discountOffersData.users = selectedUsers;
                    }
                  "
                />
              </div>
            </div>
          </SplitterPanel>

          <SplitterPanel>
            <div class="col-12 my-4">
              <div class="w-full flex justify-content-start">
                <div class="w-8">
                  <h3 class="mb-6">
                    {{
                      $t("transportation.services.discount.timePeriod.title")
                    }}
                  </h3>
                  <div class="mb-4 grid">
                    <div class="col-12 md:col-6 lg:col-4 xl:col-4 mb-4">
                      <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                          <ion-icon
                            name="cash-outline"
                            class="text-2xl"
                          ></ion-icon>
                        </span>
                        <span class="p-float-label">
                          <Calendar
                            autofocus
                            id="inputgroup"
                            type="text"
                            v-model="discountPeriod.startTime"
                            dateFormat="dd/mm/yy"
                            timeOnly
                            :class="{
                              'p-invalid':
                                dpv$.startTime.$invalid &&
                                addNewPeriodSubmitted,
                            }"
                            showSeconds
                          />
                          <label for="inputgroup">{{
                            dpv$.startTime.$invalid && addNewPeriodSubmitted
                              ? $t("validationMessages.required", {
                                  field: $t(
                                    "transportation.services.discount.timePeriod.endTime"
                                  ),
                                })
                              : $t(
                                  "transportation.services.discount.timePeriod.startTime"
                                )
                          }}</label>
                        </span>
                      </div>
                    </div>
                    <div class="col-12 md:col-6 lg:col-4 xl:col-4 mb-4">
                      <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                          <ion-icon
                            name="cash-outline"
                            class="text-2xl"
                          ></ion-icon>
                        </span>
                        <span class="p-float-label">
                          <Calendar
                            autofocus
                            id="inputgroup"
                            type="text"
                            v-model="discountPeriod.endTime"
                            dateFormat="dd/mm/yy"
                            timeOnly
                            :class="{
                              'p-invalid':
                                dpv$.endTime.$invalid && addNewPeriodSubmitted,
                            }"
                            showSeconds
                          />
                          <label for="inputgroup">{{
                            dpv$.endTime.$invalid && addNewPeriodSubmitted
                              ? $t("validationMessages.required", {
                                  field: $t(
                                    "transportation.services.discount.timePeriod.endTime"
                                  ),
                                })
                              : $t(
                                  "transportation.services.discount.timePeriod.endTime"
                                )
                          }}</label>
                        </span>
                      </div>
                    </div>
                    <div
                      class="flex justify-content-center align-items-start mt-2"
                    >
                      <Button @click="addNewPeriod">{{
                        $t("buttons.add_field", {
                          field: $t(
                            "transportation.services.discount.timePeriod.title"
                          ),
                        })
                      }}</Button>
                    </div>
                  </div>
                  <DataTable :value="discountOffersData.periods">
                    <Column
                      field="startTime"
                      :header="
                        $t(
                          'transportation.services.discount.timePeriod.startTime'
                        )
                      "
                    >
                      <template #body="slotProps">
                        {{ slotProps.data.startTime }}
                      </template>
                    </Column>
                    <Column
                      field="endTime"
                      :header="
                        $t(
                          'transportation.services.discount.timePeriod.endTime'
                        )
                      "
                    >
                      <template #body="slotProps">
                        {{ slotProps.data.endTime }}
                      </template>
                    </Column>
                    <Column style="width: 10rem; text-align: end">
                      <template #body="slotProps">
                        <Button
                          icon="pi pi-times"
                          class="p-button-danger"
                          @click="deletePeriod(slotProps)"
                        />
                      </template>
                    </Column>
                  </DataTable>
                </div>
              </div>
            </div>
          </SplitterPanel>

          <!-- adding requirement  -->
          <SplitterPanel>
            <div class="col-12 my-4">
              <div class="w-full flex justify-content-start">
                <div class="w-8">
                  <h3 class="mb-6">
                    {{ $t("transportation.discountOffers.fields.title") }}
                  </h3>
                  <div class="mb-4 grid">
                    <div class="col-12 md:col-6 lg:col-4 xl:col-4 mb-4">
                      <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                          <ion-icon
                            name="cash-outline"
                            class="text-2xl"
                          ></ion-icon>
                        </span>
                        <span class="p-float-label">
                          <InputNumber
                            autofocus
                            id="inputgroup"
                            v-model="
                              discountOffersData.requirement.minTaskCount
                            "
                          />
                          <label for="inputgroup">{{
                            $t(
                              "transportation.discountOffers.fields.minTaskCount"
                            )
                          }}</label>
                        </span>
                      </div>
                    </div>

                    <div class="col-12 md:col-6 lg:col-4 xl:col-4 mb-4">
                      <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                          <ion-icon
                            name="cash-outline"
                            class="text-2xl"
                          ></ion-icon>
                        </span>
                        <span class="p-float-label">
                          <InputNumber
                            autofocus
                            id="inputgroup"
                            v-model="
                              discountOffersData.requirement.maxRedemptions
                            "
                          />
                          <label for="inputgroup">{{
                            $t(
                              "transportation.discountOffers.fields.maxRedemptions"
                            )
                          }}</label>
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
                            :options="requirementEnum"
                            v-model="
                              discountOffersData.requirement
                                .taskCompletionTimeFrame
                            "
                          >
                            <template #value="slotProps">
                              <div>
                                {{
                                  slotProps.value
                                    ? $t(
                                        `transportation.discountOffers.fields.type.${slotProps.value}`
                                      )
                                    : submittedForm
                                    ? $t("validationMessages.required", {
                                        filed: $t(
                                          "transportation.discountOffers.fields.type.type"
                                        ),
                                      })
                                    : $t(
                                        `transportation.discountOffers.fields.type.type`
                                      )
                                }}
                              </div>
                            </template>
                            <template #option="slotProps">
                              {{
                                $t(
                                  `transportation.discountOffers.fields.type.${slotProps.option}`
                                )
                              }}
                            </template>
                          </Dropdown>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SplitterPanel>
          <!-- adding step  -->
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
                v-if="
                  discountOffersData.type == DiscountType.PERCENT ||
                  discountOffersData.type == DiscountType.LIMITATION
                "
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
                  v-if="discountOffersData.type == 'Percent'"
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
              v-if="discountOffersData.steps.length < 1 && submittedForm"
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
import Calendar from "primevue/calendar";
import { onMounted, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import SplitterPanel from "primevue/splitterpanel";
import Splitter from "primevue/splitter";
import { useRouter } from "vue-router";
import {
  DiscountOffersService,
  DiscountType,
  TimeFrame,
  type PeriodRequest,
  type ServiceDto,
} from "@/backend/transport";
import { endOfToday, thisMoment } from "@/composables/customRequest";
import L from "leaflet";
import "leaflet-draw";
import Message from "primevue/message";
import { DiscountCodeTypeEnum } from "@/common/models/transportation/discountCodeTypeEnum";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import { MonitoringStore } from "@/views/transportation/support/monitoring/monitoringStore";
import { currentUser } from "@/stores/currentUser";
import {
  createMapperForCreateAndUpdateDiscountOffers,
  type CreateAndUpdateDiscountOffersDto,
} from "./mapperToCreate";
import { ServiceStore } from "@/stores/common/service";
import SearchUserComponent from "@/components/searchUserDropdown.vue";

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
  startFrom: { required },
  type: { required },
};

const stepsRules = {
  value: { required },
  repeat: { required },
};

const requirementRules = {
  minTaskCount: { required },
  taskCompletionTimeFrame: { required },
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

const requirementEnum = Object.keys(TimeFrame).map((key) => TimeFrame[key]);

const continueBeyondFinalStepOptions = [
  { label: "True", value: true },
  { label: "False", value: false },
];
const discountOffersData = ref<CreateAndUpdateDiscountOffersDto>({
  usageLimit: null,
  services: undefined,
  requirement: {
    minTaskCount: undefined,
    taskCompletionTimeFrame: TimeFrame.SAME_MONTH,
    maxRedemptions: undefined,
  },
  startFrom: new Date(thisMoment),
  validUntil: null,
  type: DiscountType.PERCENT,
  users: undefined,
  continueBeyondFinalStep: undefined,
  steps: [],
  periods: [],
  boundary: undefined,
});

const showDeleteShape = ref(false);
const v$ = useVuelidate(rules, discountOffersData);
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
  discountOffersData.value.boundary = layer._latlngs[0].map((latLng) => ({
    lng: latLng.lng,
    lat: latLng.lat,
  }));
  drawnItems.addLayer(e.layer);
  showDeleteShape.value = true;
}

function deleteShape() {
  creatingShapeError.value = false;
  drawnItems.clearLayers();
  showDeleteShape.value = false;
  delete discountOffersData.value.boundary;
}

//  check the requirement
function validateRequirement() {
  const req = discountOffersData.value.requirement;

  // Check if both fields are empty
  if (isRequirementEmpty()) {
    discountOffersData.value.requirement = undefined;
    return true;
  }

  // Validate if any of the fields is provided
  if (req.minTaskCount !== undefined || req.maxRedemptions !== undefined) {
    const reqValidation = useVuelidate(
      requirementRules,
      discountOffersData.value.requirement
    );
    reqValidation.value.$touch();
    return !reqValidation.value.$invalid;
  }

  return true;
}

function isRequirementEmpty() {
  if (
    discountOffersData.value.requirement &&
    discountOffersData.value.requirement.minTaskCount !== undefined
  ) {
    const req = discountOffersData.value.requirement;
    return req.minTaskCount === undefined && req.maxRedemptions === undefined;
  }
}

function submitData() {
  submittedForm.value = true;

  discountOffersData.value.steps = steps.value;

  // Check if there are steps added
  if (discountOffersData.value.steps?.length < 1) {
    return;
  }

  // Validate  requirement
  if (!validateRequirement()) {
    return;
  }

  // Check if the form is valid
  if (v$.value.$invalid) {
    return;
  }

  // Proceed with the API call if the form is valid
  DiscountOffersService.postDiscountOffer({
    requestBody: createMapperForCreateAndUpdateDiscountOffers(
      discountOffersData.value
    ),
  }).then(() => {
    // Handle the success scenario
    toast.changeToastState({
      severity: t("toasts.added_success_header"),
      summary: t("toasts.added_success_desc", {
        field: t("fields.discount"),
      }),
      type: "success",
    });
    router.push({
      name: "transportationListDiscountOffers",
    });
  });
}

// adding step
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

// adding period
const discountPeriodRules = {
  startTime: { required },
  endTime: { required },
};
const discountPeriod = ref<PeriodRequest | any>({
  startTime: "",
  endTime: "",
});
const addNewPeriodSubmitted = ref(false);
const dpv$ = useVuelidate(discountPeriodRules, discountPeriod.value);

function addNewPeriod() {
  addNewPeriodSubmitted.value = true;
  if (dpv$.value.$invalid) {
    return;
  }
  discountOffersData.value.periods?.push({
    startTime: discountPeriod.value.startTime,
    endTime: discountPeriod.value.endTime,
  });
}
function deletePeriod(data) {
  discountOffersData.value?.periods?.splice(data.index, 1);
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
