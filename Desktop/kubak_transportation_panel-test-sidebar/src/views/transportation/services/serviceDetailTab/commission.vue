<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="my-3 pb-3">
    <div class="w-full flex justify-content-end my-3">
      <div v-if="ifUserHasPolicy(PolicyType.WRITE_SERVICE)">
        <Button
          :label="$t('buttons.edit')"
          icon="pi pi-bookmark"
          :loading="requestStatusStore.loading"
          @click="editCommission"
        />
      </div>
    </div>
  </div>
  <div class="grid mt-4 px-6" style="width: 100% !important">
    <div class="mb-4 px-2">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <ion-icon name="cash-outline" class="text-2xl"></ion-icon>
        </span>
        <span class="p-float-label">
          <InputNumber
            inputId="minmaxfraction"
            :minFractionDigits="0"
            :maxFractionDigits="5"
            autofocus
            id="inputgroup"
            type="text"
            v-model="commissionData.defaultValue"
            style="min-width: 150px"
            :class="{
              'p-invalid':
                !commissionData.defaultValue && submittedCommissionUpdate,
            }"
            :disabled="!ifUserHasPolicy(PolicyType.WRITE_SERVICE)"
          />
          <label for="inputgroup">{{
            !commissionData.defaultValue && submittedCommissionUpdate
              ? $t("validationMessages.required", {
                  field: $t("transportation.services.commission.defaultValue"),
                })
              : $t(`transportation.services.commission.defaultValue`)
          }}</label>
        </span>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap gap-2 mt-4 px-6" style="width: 100% !important">
    <div class="mb-4" style="min-width: 150px">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <ion-icon name="time-outline" class="text-2xl"></ion-icon>
        </span>
        <span class="p-float-label">
          <Calendar
            inputId="minmaxfraction"
            :minFractionDigits="0"
            :maxFractionDigits="5"
            autofocus
            id="inputgroup"
            type="text"
            v-model="newCommissionPeriodData.start"
            timeOnly
            showSeconds
            :class="{
              'p-invalid': pv$.start.$invalid && submittedButton,
            }"
          />
          <label for="inputgroup">{{
            pv$.start.$invalid && submittedButton
              ? $t("validationMessages.required", {
                  field: $t("transportation.common.startAt"),
                })
              : $t(`transportation.common.startAt`)
          }}</label>
        </span>
      </div>
    </div>
    <div class="mb-4" style="min-width: 150px">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <ion-icon name="time-outline" class="text-2xl"></ion-icon>
        </span>
        <span class="p-float-label">
          <Calendar
            inputId="minmaxfraction"
            :minFractionDigits="0"
            :maxFractionDigits="5"
            autofocus
            id="inputgroup"
            type="text"
            v-model="newCommissionPeriodData.end"
            timeOnly
            showSeconds
            :class="{
              'p-invalid': pv$.end.$invalid && submittedButton,
            }"
          />
          <label for="inputgroup">{{
            pv$.end.$invalid && submittedButton
              ? $t("validationMessages.required", {
                  field: $t("transportation.common.endAt"),
                })
              : $t(`transportation.common.endAt`)
          }}</label>
        </span>
      </div>
    </div>
    <div class="mb-4" style="min-width: 150px">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <ion-icon name="cash-outline" class="text-2xl"></ion-icon>
        </span>
        <span class="p-float-label">
          <InputNumber
            inputId="minmaxfraction"
            :minFractionDigits="0"
            :maxFractionDigits="5"
            autofocus
            id="inputgroup"
            type="text"
            v-model="newCommissionPeriodData.value"
            :class="{
              'p-invalid': pv$.value.$invalid && submittedButton,
            }"
          />
          <label for="inputgroup">{{
            pv$.value.$invalid && submittedButton
              ? $t("validationMessages.required", {
                  field: $t("transportation.services.commission.value"),
                })
              : $t(`transportation.services.commission.value`)
          }}</label>
        </span>
      </div>
    </div>
    <div class="mb-4" style="min-width: 150px">
      <div class="p-inputgroup" style="min-width: 150px">
        <span class="p-inputgroup-addon">
          <ion-icon name="calendar-outline" class="text-2xl"></ion-icon>
        </span>
        <span class="p-float-label">
          <MultiSelect
            style="width: 220px"
            :options="dayOfWeekOptions"
            display="chip"
            v-model="newCommissionPeriodData.dayOfWeeks"
          >
            <template #value="valueProp">
              <div class="mt-1">
                {{ valueProp.value ?? valueProp.placeholder }}
              </div>
            </template>
            <template #option="slotProps">
              <p>{{ slotProps.option }}</p>
            </template>
          </MultiSelect>
          <label for="inputgroup">{{
            $t(`transportation.services.commission.dayOfWeeks`)
          }}</label>
        </span>
      </div>
    </div>
    <div class="mb-4" style="min-width: 150px">
      <Button @click="addNewPeriod">
        <ion-icon name="add-outline" class="text-2xl"></ion-icon>
        {{
          $t("buttons.add_field", {
            field: $t("transportation.services.commission.commissionPeriod"),
          })
        }}
      </Button>
    </div>
  </div>
  <div class="px-4 pb-4 lg:px-6">
    <DataTable :value="commissionData.periods">
      <Column field="start" :header="$t('transportation.common.startAt')">
        <template #body="slotProp">
          <Calendar
            inputId="minmaxfraction"
            :minFractionDigits="0"
            :maxFractionDigits="5"
            autofocus
            id="inputgroup"
            type="text"
            v-model="slotProp.data.start"
            timeOnly
            showSeconds
            style="min-width: 150px"
          />
        </template>
      </Column>
      <Column field="end" :header="$t('transportation.common.endAt')"
        ><template #body="slotProp">
          <Calendar
            inputId="minmaxfraction"
            :minFractionDigits="0"
            :maxFractionDigits="5"
            autofocus
            id="inputgroup"
            type="text"
            v-model="slotProp.data.end"
            timeOnly
            showSeconds
            style="min-width: 150px"
          /> </template
      ></Column>
      <Column header="value">
        <template #body="slotProp">
          <InputNumber
            inputId="minmaxfraction"
            :minFractionDigits="0"
            :maxFractionDigits="5"
            autofocus
            id="inputgroup"
            type="text"
            v-model="slotProp.data.value"
            style="min-width: 150px"
          />
        </template>
      </Column>
      <Column
        #body="slotProp"
        :header="$t('transportation.services.commission.dayOfWeeks')"
      >
        <MultiSelect
          :options="dayOfWeekOptions"
          display="chip"
          v-model="slotProp.data.dayOfWeeks"
          style="width: 300px; min-height: 40px"
        >
          <template #value="valueProp">
            <div class="mt-1">
              {{ valueProp.value ?? valueProp.placeholder }}
            </div>
          </template>
          <template #option="slotProps">
            <p>{{ slotProps.option }}</p>
          </template>
        </MultiSelect>
      </Column>
      <Column :exportable="false" style="width: 10rem; text-align: end">
        <template #body="slotProps">
          <div class="px-8 flex">
            <Button
              icon="pi pi-trash"
              class="p-button-danger"
              @click="deleteCommissionPeriod(slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script lang="ts" setup>
import type { CommissionDto, CommissionPeriodDto } from "@/backend/transport";
import { ifUserHasPolicy } from "@/composables/checkUserPolicy";
import { requestStatus } from "@/stores/common/requestStatus";
import { onMounted, ref, watch } from "vue";
import {
  DayOfWeek,
  PolicyType,
  ServiceService,
  type UpdateCommissionRequest,
} from "@/backend/transport";
import { useRoute } from "vue-router";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import Calendar from "primevue/calendar";
import MultiSelect from "primevue/multiselect";
import {
  addNewPeriodModel,
  mapCreateCommissionPeriodRequest,
  mapGetCommissionPeriodRequest,
} from "@/composables/mapper/serviceCommission";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const submittedButton = ref(false);
const submittedCommissionUpdate = ref(false);
const props = defineProps(["serviceCommission"]);

const requestStatusStore = requestStatus();
const route = useRoute();
const toast = toastStore();
const { t } = useI18n();
const emits = defineEmits(["updateCommission"]);
const dayOfWeekOptions = Object.keys(DayOfWeek).map((key) => DayOfWeek[key]);
const commissionData = ref<CommissionDto>({
  defaultValue: undefined,
});
onMounted(() => {
  getData();
});
watch(
  () => props.serviceCommission,
  () => {
    getData();
  }
);
function getData() {
  if (props.serviceCommission) {
    commissionData.value = props.serviceCommission;
    commissionData.value.periods = mapGetCommissionPeriodRequest(
      props.serviceCommission.periods
    );
  }
}
const newCommissionPeriodData = ref<CommissionPeriodDto>({
  start: undefined,
  end: undefined,
  value: undefined,
  dayOfWeeks: undefined,
});
const rule = {
  start: { required },
  end: { required },
  value: { required },
};
const pv$ = useVuelidate(rule, newCommissionPeriodData as any);
function editCommission() {
  submittedCommissionUpdate.value = true;
  if (!commissionData.value.defaultValue) return;
  commissionData.value.periods = mapCreateCommissionPeriodRequest(
    commissionData.value.periods ?? []
  );
  ServiceService.updateCommission({
    id: +route.params.id,
    requestBody: commissionData.value as UpdateCommissionRequest,
  }).then(() => {
    toast.changeToastState({
      severity: t("toasts.updated_success_header"),
      summary: t("toasts.updated_success_desc", {
        field: t("fields.service"),
      }),
      type: "success",
    });
    emits("updateCommission");
  });
}
function addNewPeriod() {
  submittedButton.value = true;
  if (pv$.value.$invalid) return;
  newCommissionPeriodData.value.id =
    (commissionData.value.periods?.length ?? 0) + 1;
  commissionData.value.periods?.push(
    addNewPeriodModel(newCommissionPeriodData.value)
  );

  newCommissionPeriodData.value = {
    start: undefined,
    end: undefined,
    value: undefined,
    dayOfWeeks: undefined,
  };
}
function deleteCommissionPeriod(data) {
  const periodIndex = commissionData.value.periods?.findIndex(
    (x) => x.id == data.id
  );
  if (periodIndex != -1) {
    commissionData.value.periods?.splice(periodIndex!, 1);
  }
}
</script>
