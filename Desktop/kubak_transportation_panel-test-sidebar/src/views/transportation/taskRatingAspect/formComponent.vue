<template>
  <div class="flex justify-content-center py-4">
    <div class="createCardContainer p-5 xl:w-10">
      <div class="w-full py-3" style="border-bottom: dashed #e6e2e2 2px">
        <div class="flex flex-column align-items-center">
          <div class="w-full grid">
            <!-- weight number-->
            <div class="col-12 md:col-6 lg:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="barbell-outline"></ion-icon>
                </span>
                <span class="p-float-label">
                  <InputNumber
                    class=""
                    autofocus
                    id="taskRatingData.weight"
                    type="number"
                    v-model="taskRatingData.weight"
                    inputId="minmax-buttons"
                    mode="decimal"
                    showButtons
                    :min="0"
                    :max="10"
                    @input="validateWeight"
                  />
                  <label for="taskRatingData.weight">
                    {{
                      $t("transportation.tasks.fields.taskRatingAspectWeight")
                    }}
                  </label>
                </span>
              </div>
              <small v-if="weightValidationErr" class="p-error">
                {{ $t("transportation.tasks.fields.taskRatingAspectWeight") }}
                {{ $t("validationMessages.required") }}</small
              >
            </div>
            <!-- rater roll -->
            <div class="col-12 md:col-6 lg:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="person-outline"></ion-icon>
                </span>

                <Dropdown
                  :placeholder="$t('roles.raterRole')"
                  :options="roles"
                  v-model="taskRatingData.raterRole"
                  @change="validateRoles"
                >
                  <template #value="slotProps">
                    {{
                      slotProps.value
                        ? slotProps.value.name ?? slotProps.value
                        : slotProps.placeholder
                    }}
                  </template>
                  <template #option="slotProps">
                    <p>
                      {{ slotProps.option.name }}
                    </p>
                  </template>
                </Dropdown>
              </div>
              <small v-if="raterRoleValidationErr" class="p-error">
                {{ $t("roles.raterRole") }}
                {{ $t("validationMessages.required") }}</small
              >
            </div>
            <!-- rated roll -->
            <div class="col-12 md:col-6 lg:col-4 mb-4">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <ion-icon name="person-outline"></ion-icon>
                </span>
                <Dropdown
                  :placeholder="$t('roles.ratedRole')"
                  :options="roles"
                  v-model="taskRatingData.ratedRole"
                  @change="validateRoles"
                >
                  <template #value="slotProps">
                    {{
                      slotProps.value
                        ? slotProps.value.name ?? slotProps.value
                        : slotProps.placeholder
                    }}
                  </template>
                  <template #option="slotProps">
                    <p>
                      {{ slotProps.option.name }}
                    </p>
                  </template>
                </Dropdown>
              </div>
              <small v-if="ratedRoleValidationErr" class="p-error">
                {{ $t("roles.ratedRole") }}
                {{ $t("validationMessages.required") }}</small
              >
            </div>
          </div>
        </div>
      </div>
      <div class="w-full mt-5">
        <div style="width: 100%">
          <TabView>
            <TabPanel
              v-for="(translation, index) in taskRatingData.translations"
              :header="translation.language"
              :key="index"
            >
              <div class="w-full">
                <!-- title -->
                <div class="py-3 w-full">
                  <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                      <ion-icon name="text-outline"></ion-icon>
                    </span>
                    <span class="p-float-label">
                      <InputText
                        autofocus
                        type="text"
                        :id="`${translation}attribute.name`"
                        v-model="translation.name"
                      />

                      <label :for="`name-${translation.language}`">
                        {{
                          $t("transportation.tasks.fields.taskRatingAspectName")
                        }}
                      </label>
                    </span>
                  </div>
                  <small v-if="enTranslationError" class="p-error">
                    {{ $t("transportation.tasks.fields.taskRatingAspectName") }}
                    {{ $t("validationMessages.required") }}
                  </small>
                </div>

                <!-- description -->
                <div class="py-3">
                  <span class="p-float-label">
                    <Textarea
                      v-model="translation.description"
                      rows="10"
                      class="w-full"
                    />
                    <label>
                      {{
                        $t(
                          "transportation.tasks.fields.taskRatingAspectDescription"
                        )
                      }}
                    </label>
                  </span>
                </div>
                <small v-if="enTranslationError" class="p-error">
                  {{
                    $t(
                      "transportation.tasks.fields.taskRatingAspectDescription"
                    )
                  }}{{ $t("validationMessages.required") }}
                </small>
              </div>
            </TabPanel>
          </TabView>
        </div>

        <!-- submit button  -->
        <div class="w-full flex justify-content-end pt-4">
          <Button
            :label="$t('buttons.submit')"
            class="h-3rem w-8rem"
            @click="submitData"
            :loading="requestStatusStore.loading"
            icon="pi pi-check-circle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Language, type RoleDto } from "@/backend/auth";
import { requestStatus } from "@/stores/common/requestStatus";
import { ref, watch } from "vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Textarea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";
import { RoleType } from "@/backend/transport";

const emit = defineEmits(["formSubmitted"]);
const props = defineProps(["taskRatingAspectData"]);

const requestStatusStore = requestStatus();
const languages = Object.keys(Language).map((key) => Language[key]);

// get all exist roles
const roles = Object.keys(RoleType).map((key) => ({ name: RoleType[key] }));

interface taskDataLanguageTranslation {
  language: Language;
  name: string;
  description: string;
}
interface TaskDataType {
  weight?: number;
  raterRole?: RoleDto;
  ratedRole?: RoleDto;
  translations?: Array<taskDataLanguageTranslation> | null;
}

const taskRatingData = ref<TaskDataType>({
  weight: undefined,
  raterRole: undefined,
  ratedRole: undefined,
  translations: languages.map((language) => ({
    name: "",
    description: "",
    language: language,
  })),
});

//get all exist data for update
function mergeTranslationsWithAllLanguages(
  existingTranslations: taskDataLanguageTranslation[]
) {
  const mergedTranslations: taskDataLanguageTranslation[] = [];
  const existingLanguages = existingTranslations.map((t) => t.language);

  // First, push all existing translations
  mergedTranslations.push(...existingTranslations);

  // Then, check for missing languages and add them
  languages.forEach((language) => {
    if (!existingLanguages.includes(language)) {
      mergedTranslations.push({
        name: "",
        description: "",
        language: language,
      });
    }
  });

  return mergedTranslations;
}

function initTaskData() {
  //
  // Start with an empty array or the existing translations
  const initialTranslations =
    props.taskRatingAspectData && props.taskRatingAspectData.translations
      ? props.taskRatingAspectData.translations
      : [];

  // Merge with all languages to ensure all tabs are represented
  taskRatingData.value.translations =
    mergeTranslationsWithAllLanguages(initialTranslations);

  // Set other values from props if they exist
  if (props.taskRatingAspectData) {
    taskRatingData.value.weight = props.taskRatingAspectData.weight;
    taskRatingData.value.raterRole = props.taskRatingAspectData.raterRole;
    taskRatingData.value.ratedRole = props.taskRatingAspectData.ratedRole;
  }
}

// Call initTaskData
initTaskData();
watch(
  () => props.taskRatingAspectData,
  () => {
    initTaskData();
  }
);
// apply validation to weight
const weightValidationErr = ref(false);
const ratedRoleValidationErr = ref(false);
const raterRoleValidationErr = ref(false);
const enTranslationError = ref(false);

// const error = {
//   weightValidationErr: false,
//   ratedRoleValidationErr: false,
//   raterRoleValidationErr: false,
//   enTranslationError: false,
// };
// apply validation to weight
function validateWeight() {
  weightValidationErr.value = !taskRatingData.value.weight;
}

// apply validation to rated and rater roles
function validateRoles() {
  ratedRoleValidationErr.value = !taskRatingData.value.ratedRole;
  raterRoleValidationErr.value = !taskRatingData.value.raterRole;
}

// submitData
function submitData() {
  weightValidationErr.value = false;
  ratedRoleValidationErr.value = false;
  raterRoleValidationErr.value = false;
  enTranslationError.value = false;

  // Perform validations
  validateWeight();
  validateRoles();

  // Validate that at least the English translation is filled out
  const enTranslation = taskRatingData.value.translations?.find(
    (translation) => translation.language === Language.EN
  );

  // If the English translation is missing or incomplete, flag an error
  if (!enTranslation || !enTranslation.name || !enTranslation.description) {
    enTranslationError.value = true;
  }

  // If any validation error exists, do not proceed with submission
  if (
    weightValidationErr.value ||
    ratedRoleValidationErr.value ||
    raterRoleValidationErr.value ||
    enTranslationError.value
  ) {
    return;
  }

  // submission data to include only filled-out translations
  const filledTranslations =
    taskRatingData.value.translations?.filter(
      (translation) => translation.name && translation.description
    ) || [];

  const submissionData = {
    ratedRole:
      typeof taskRatingData.value.ratedRole === "string"
        ? taskRatingData.value.ratedRole
        : taskRatingData.value.ratedRole?.name,
    raterRole:
      typeof taskRatingData.value.raterRole === "string"
        ? taskRatingData.value.raterRole
        : taskRatingData.value.raterRole?.name,
    weight: taskRatingData.value.weight,
    translations: filledTranslations,
  };

  // emit the form submission event
  emit("formSubmitted", submissionData);
}

//empty object after submitData
</script>

<style>
.p-inputnumber-button-group {
  height: 10px !important;
}
</style>
