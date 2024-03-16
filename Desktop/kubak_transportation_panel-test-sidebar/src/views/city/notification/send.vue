<template>
  <div class="page-min-style">
    <div class="page-min-container">
      <div class="grid">
        <div class="col-12 md:col-6 lg:col-4 mb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <ion-icon name="business-outline"></ion-icon>
            </span>
            <MultiSelect
              :options="regions"
              display="chip"
              :placeholder="$t('fields.regions')"
              v-model="selectedRegions"
            >
              <template #value="valueProp">
                {{
                  valueProp.value.length
                    ? valueProp.value.map((x) => x.name).join(" , ")
                    : valueProp.placeholder
                }}
              </template>
              <template #option="slotProps">
                <p>{{ slotProps.option?.name }}</p>
              </template>
            </MultiSelect>
          </div>
        </div>

        <div class="col-12 md:col-6 lg:col-4 mb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <ion-icon name="document-lock-outline"></ion-icon>
            </span>
            <MultiSelect
              :placeholder="$t('roles.role')"
              :options="roles"
              v-model="notification.roles"
            >
              <template #value="slotProps">
                {{
                  notification.roles && notification.roles.length > 0
                    ? notification.roles.length < 4
                      ? notification.roles.map((x: any) => x.name).join(" , ")
                      : `${notification.roles.length} ${$t(
                          "dropdowns.selected_field",
                          {
                            field: $t("fields.role"),
                          }
                        )}`
                    : slotProps.placeholder
                }}
              </template>
              <template #option="slotProps">
                <p>
                  {{ slotProps.option?.name }}
                </p>
              </template>
            </MultiSelect>
          </div>
        </div>
        <div class="col-12 md:col-6 lg:col-4 mb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <ion-icon name="calendar-outline" class="text-xl"></ion-icon>
            </span>
            <span class="p-float-label">
              <Calendar
                autofocus
                id="inputgroup"
                type="text"
                v-model="notification.scheduledTo"
                showTime
                showSeconds
                dateFormat="dd/mm/yy"
                :class="{
                  'p-invalid':
                    notification.scheduledTo &&
                    notification.scheduledTo < new Date(),
                }"
              />
              <label for="inputgroup">{{
                notification.scheduledTo &&
                notification.scheduledTo < new Date()
                  ? $t("validationMessages.startDateMoreThanNow")
                  : $t("transportation.common.startDate")
              }}</label>
            </span>
          </div>
        </div>
        <div class="col-12 md:col-6 lg:col-4 mb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <ion-icon name="calendar-outline" class="text-xl"></ion-icon>
            </span>
            <span class="p-float-label">
              <Calendar
                autofocus
                id="inputgroup"
                type="text"
                v-model="notification.expirationDate"
                showTime
                showSeconds
                dateFormat="dd/mm/yy"
              />
              <label for="inputgroup">{{
                $t("notification.expirationDate")
              }}</label>
            </span>
          </div>
        </div>

        <div class="col-12 md:col-6 lg:col-4 mb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <ion-icon name="document-lock-outline"></ion-icon>
            </span>
            <Dropdown
              :placeholder="$t('roles.role')"
              :options="notificationTypes"
              v-model="notification.type"
            >
              <template #value="slotProps">
                {{ notification.type ?? slotProps.placeholder }}
              </template>
              <template #option="slotProps">
                <p>
                  {{ slotProps.option }}
                </p>
              </template>
            </Dropdown>
          </div>
        </div>

        <div
          class="col-12 md:col-6 lg:col-4 mb-4"
          v-if="notification.type == PanelPushNotificationType.ROUTING"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <ion-icon name="link-outline" class="text-xl"></ion-icon>
            </span>
            <span class="p-float-label">
              <Dropdown
                optionDisabled="disabled"
                display="chip"
                :placeholder="$t('notification.link')"
                :options="routes"
                v-model="notification.route"
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

              <label for="inputgroup">{{ $t("notification.link") }}</label>
            </span>
          </div>
        </div>
        <div class="col-12 md:col-6 lg:col-4 mb-4">
          <SearchUserDropdown
            @selectedUsers="addUsers"
            :existingUser="currentUsers"
            :showSelectedUsersAsAccordion="true"
          />
        </div>
        <div
          class="col-12 md:col-6 lg:col-4 mb-4"
          v-if="
            notification.type == PanelPushNotificationType.ANNOUNCEMENT &&
            notification.button
          "
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <ion-icon name="link-outline" class="text-xl"></ion-icon>
            </span>
            <span class="p-float-label">
              <InputText
                autofocus
                id="inputgroup"
                type="text"
                v-model="notification.button!.title"
              />
              <label for="inputgroup">{{
                $t("notification.buttonTitle")
              }}</label>
            </span>
          </div>
        </div>
        <div
          class="col-12 md:col-6 lg:col-4 mb-4"
          v-if="notification.type == PanelPushNotificationType.ANNOUNCEMENT"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <ion-icon name="link-outline" class="text-xl"></ion-icon>
            </span>
            <span class="p-float-label">
              <Dropdown
                optionDisabled="disabled"
                display="chip"
                :placeholder="$t('notification.link')"
                :options="routes"
                v-model="notification.button!.route"
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
              <label for="inputgroup">{{ $t("notification.link") }}</label>
            </span>
          </div>
        </div>
      </div>

      <div
        class="my-2 py-4"
        style="border-top: 1px solid var(--border-color-kubak)"
      >
        <TabView>
          <TabPanel
            v-for="(notificationMessage, index) in notification.messages"
            :key="index"
            :header="notificationMessage.language ?? ''"
          >
            <div class="grid">
              <div class="col-12 md:col-6 lg:col-6">
                <div class="mb-5">
                  <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                      <ion-icon name="text-outline" class="text-xl"></ion-icon>
                    </span>
                    <span class="p-float-label">
                      <InputText
                        autofocus
                        id="inputgroup"
                        type="text"
                        v-model="notificationMessage.title"
                      />
                      <label for="inputgroup">{{
                        $t("auth.area.title")
                      }}</label>
                    </span>
                  </div>
                </div>
                <div class="mb-5">
                  <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                      <ion-icon name="text-outline" class="text-xl"></ion-icon>
                    </span>
                    <span class="p-float-label">
                      <InputText
                        autofocus
                        id="inputgroup"
                        type="text"
                        v-model="notificationMessage.subTitle"
                      />
                      <label for="inputgroup">{{
                        $t("notification.subTitle")
                      }}</label>
                    </span>
                  </div>
                </div>
              </div>

              <!-- upload image  -->
              <div
                class="col-12 md:col-6 lg:col-6 xl:col-5 right-side-container"
              >
                <Button
                  v-if="!notificationMessage.image"
                  outlined
                  class="uploaded-image mb-2 cursor-pointer"
                  @click="openDialog(notificationMessage.language)"
                >
                  <i class="pi pi-image" style="font-size: 2rem"></i>
                </Button>

                <!-- Showing uploaded image -->
                <div v-if="notificationMessage?.image?.imageFile">
                  <img
                    @click="openDialog(notificationMessage.language)"
                    :src="notificationMessage?.image?.imageFile || ''"
                    alt="Uploaded Image"
                    class="uploaded-image mb-2 cursor-pointer"
                  />
                </div>

                <!-- Showing image from existingFileUrl -->
                <div v-if="notificationMessage?.image?.existingFileUrl">
                  <img
                    @click="openDialog(notificationMessage.language)"
                    :src="
                      getImage(
                        notificationMessage?.image?.existingFileUrl || ''
                      )
                    "
                    alt="Uploaded Image"
                    class="uploaded-image mb-2 cursor-pointer"
                  />
                </div>
              </div>
              <!-- upload image  -->

              <!-- text area  -->
              <div class="w-full flex align-items-end">
                <div class="col-12">
                  <h4 for="inputgroup" class="my-2">
                    {{ $t("notification.description") }}
                  </h4>
                  <div class="p-inputgroup">
                    <Textarea
                      autofocus
                      id="inputgroup"
                      type="text"
                      cols="50"
                      rows="8"
                      v-model="notificationMessage.description"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>

      <div
        class="w-full flex justify-content-center"
        v-if="invalidData.enLanguage"
      >
        <Message severity="error" class="w-full" :closable="false">
          {{ $t("validationMessages.language") }}
        </Message>
      </div>
      <div class="flex justify-content-end">
        <Button
          :label="$t('buttons.submit')"
          @click="sendNotification"
          :loading="requestStatusStore.loading"
          icon="pi pi-check-circle"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Textarea from "primevue/textarea";
import Calendar from "primevue/calendar";
import { ref, onMounted } from "vue";
import {
  PanelPushNotificationType,
  PushNotificationService,
  AppRoutesService,
  UploadedFileService,
  UploadedFileType,
} from "@/backend/city";
import { RegionStore } from "@/stores/common/region";
import { RoleStore } from "@/stores/common/role";
import type { RegionDto } from "@/backend/auth";
import MultiSelect from "primevue/multiselect";
import type { SendPanelPushNotificationRequest } from "@/backend/city";
import { Language } from "@/backend/auth/models/Language";
import Message from "primevue/message";
import { toastStore } from "@/stores/common/toastStore";
import { useI18n } from "vue-i18n";
import Button from "primevue/button";
import { useRoute, useRouter } from "vue-router";
import {
  createMapSendNotificationDtoToSendNotification,
  type SendNotificationDto,
} from "./mapper";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import SearchUserDropdown from "@/components/searchUserDropdown.vue";
import { getImage } from "@/composables/getImage";
import { toLocaleDateFormat } from "@/composables/dateTimeFormat";
import SelectExistingImages from "@/components/selectExistingImages.vue";
import { useDialog } from "primevue/usedialog";
import { requestStatus } from "@/stores/common/requestStatus";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const requestStatusStore = requestStatus();
const router = useRoute();
const route = useRouter();
const routes = ref();
const roleStore = RoleStore();
const selectedNotificationUsers = ref<any>(undefined);
const currentUsers = ref<any>(undefined);
const roles = ref();
const sendNotificationLoading = ref(false);

const selectedLanguage = ref<string>("");
const selectedRegions = ref<any>([]);

const languages = Object.keys(Language).map((key) => Language[key]);
const invalidData = ref({
  enLanguage: false,
  types: false,
});

const regions = ref<RegionDto[]>();
const regionStore = RegionStore();
regionStore.getAllRegion().then((res) => {
  regions.value = res;
});

const notification = ref<SendNotificationDto>({
  scheduledTo: undefined,
  expirationDate: undefined,
  regions: [],
  roles: undefined,
  type: PanelPushNotificationType.ROUTING,
  messages: [],
  users: [],
  route: undefined,
  button: {
    title: "",
    route: "",
  },
});

// get all existing images from db
const images = ref([]);
async function getAllExistImages(pageNumber: number, pageLimit: number) {
  try {
    const res = await UploadedFileService.getUploadedFiles({
      type: UploadedFileType.NOTIFICATION_IMAGE,
      page: pageNumber,
      limit: pageLimit,
      sortField: "createdAt",
      sortDescending: true,
    });
    images.value = res as [];
  } catch (error) {
    //
  }
}

function handleUploadedImage(fileUrl) {
  const message = notification.value.messages?.find(
    (msg) => msg.language === selectedLanguage.value
  );

  if (message) {
    if (typeof fileUrl.value === "string") {
      message.image = { existingFileUrl: fileUrl.value };
    } else if (fileUrl.value && fileUrl.value.imageFile instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(fileUrl.value.imageFile);
      reader.onload = () => {
        message.image = {
          bytes: fileUrl.value.bytes,
          fileName: fileUrl.value.fileName,
          imageFile: reader.result as string,
        };
        notification.value = { ...notification.value };
      };
    }
  }
}

// open dialog box
const dialog = useDialog();

async function openDialog(language) {
  await getAllExistImages(0, 10);
  selectedLanguage.value = language;

  dialog.open(SelectExistingImages, {
    emits: {
      onUploadImage: handleUploadedImage,
      imageDeleted: getAllExistImages,
      changePageNumber: getAllExistImages,
    },
    data: {
      imagesList: images,
    },
    props: {
      header: t("notification.dialogTitle", {
        field: t(`transportation.reports.reportProblemsTitle`),
      }),
      breakpoints: {
        "2000px": "50vw",
        "1300px": "70vw",
        "640px": "90vw",
      },
      modal: true,
    },
  });
}

///
roleStore.getAllRole().then((res) => {
  roles.value = res;
});

const { t } = useI18n();

const notificationTypes = Object.keys(PanelPushNotificationType).map(
  (key) => PanelPushNotificationType[key]
);

const addedUser = false;

function addUsers(users) {
  selectedNotificationUsers.value = users;
}

// return notification data by ID
function getNotificationData() {
  PushNotificationService.getPushNotificationById({ id: +router.query.id! })
    .then((response: any) => {
      selectedNotificationUsers.value = response.users;
      currentUsers.value = response.users;
      Object.assign(notification.value, response);
      //match the role from the response
      setTimeout(() => {
        if (response.expirationDate) {
          notification.value.expirationDate = toLocaleDateFormat(
            response.expirationDate
          );
        }

        if (response.scheduledTo) {
          notification.value.scheduledTo = toLocaleDateFormat(
            response.scheduledTo
          );
        }

        const matchedRoles = response.roles?.map((roleName) => {
          const matchedRole = roles.value.find(
            (storedRole) => storedRole.name === (roleName.name || roleName)
          );
          return matchedRole;
        });
        notification.value.roles = matchedRoles;

        // match the regions from the response
        selectedRegions.value = regions?.value?.filter((region) =>
          response.regions?.some(
            (responseRegion) => responseRegion.id === region.id
          )
        );

        // match the route from the response
        if (response.route) {
          const matchedRoute = routes.value.find(
            (storedRoute) => storedRoute.path === response.route
          );
          notification.value.route = matchedRoute;
        }
        if (response.button) {
          const matchedRoute = routes.value.find(
            (storedRoute) => storedRoute.path === response.button.route
          );
          if (notification.value.button) {
            notification.value.button.route = matchedRoute;
          }
        } else {
          notification.value.button = { title: "", route: "" };
        }
      }, 1000);

      addMessages();
    })
    .catch(() => {
      notification.value = {
        scheduledTo: undefined,
        expirationDate: undefined,
        regions: [],
        roles: [],
        type: PanelPushNotificationType.ROUTING,
        messages: [],
        users: [],
        route: undefined,
        button: {
          title: "",
          route: "",
        },
      };
    });
}

onMounted(async () => {
  await getAllRoutes();
  if (router.query.id) {
    getNotificationData();
  }
  addMessages();
});
function addMessages() {
  languages.map((language) => {
    if (notification.value.messages?.find((x) => x.language == language))
      return;
    notification.value.messages?.push({
      language: language,
      title: undefined,
      description: undefined,
      subTitle: undefined,
      image: undefined,
    });
  });
}

// get all routes
async function getAllRoutes() {
  AppRoutesService.getAppRoutes().then((res) => {
    routes.value = res;
  });
}

async function sendNotification() {
  sendNotificationLoading.value = true;

  const hasRoles =
    notification.value.roles && notification.value.roles.length > 0;
  const hasRegions = selectedRegions.value && selectedRegions.value.length > 0;

  const hasUsers =
    selectedNotificationUsers.value &&
    selectedNotificationUsers.value.length > 0;

  // Check for invalid combinations
  if (!hasUsers && !hasRegions && !hasRoles) {
    showToast("Please enter either roles and regions or users.");
    sendNotificationLoading.value = false;
    return;
  }

  if (hasRoles && !hasRegions) {
    showToast("Please enter regions");
    sendNotificationLoading.value = false;
    return;
  }
  if (!hasRoles && hasRegions) {
    showToast("Please enter either roles");
    sendNotificationLoading.value = false;
    return;
  }
  // Continue with sending the notification
  notification.value.regions = hasRegions
    ? selectedRegions?.value.map((region) => ({ id: region.id }))
    : [];

  if (notification.value.type !== PanelPushNotificationType.ANNOUNCEMENT) {
    notification.value.button = { title: "", route: "" };
  }

  const enLanguage = notification.value.messages?.find(
    (x) => x.language === Language.EN
  );
  if (!enLanguage || !enLanguage.title) {
    invalidData.value.enLanguage = true;
    sendNotificationLoading.value = false;
    return;
  }

  if (addedUser) {
    notification.value.users = [];
  }
  if (
    notification.value.scheduledTo &&
    notification.value.scheduledTo < new Date()
  )
    return;
  notification.value.users = selectedNotificationUsers.value;

  // Continue with sending the notification
  await PushNotificationService.sendPushNotification({
    requestBody: createMapSendNotificationDtoToSendNotification(
      notification.value
    ) as SendPanelPushNotificationRequest,
  })
    .then(() => {
      const toast = toastStore();
      toast.changeToastState({
        severity: t("toasts.added_success_header"),
        summary: t("toasts.added_success_desc", {
          field: t("auth.area.region"),
        }),
        type: "success",
      });

      route.push({ name: "cityListNotification" });
      sendNotificationLoading.value = false;
    })
    .catch(() => {
      sendNotificationLoading.value = false;
    });
}

function showToast(message) {
  toast.add({
    severity: "error",
    summary: "Error",
    detail: message,
    life: 5000,
  });
}
</script>

<style lang="scss">
.uploadedImageFile {
  height: 200px;
  width: 500px;
  border-radius: 4px;
}

.customFilterMultiSelect {
  .p-multiselect-header {
    display: none !important;
  }
}

.listBox {
  position: absolute;
  right: 0;
  width: 100px !important;
  margin: 0 10px;
  background-color: var(--background-color-kubak);
  border-radius: 4px;

  .listbox-item {
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem 0;

    &:hover {
      background-color: var(--default-color-hover-kubak);
    }

    &.active {
      background-color: var(--default-color-hover-kubak);
    }
  }
}

.closeIcon {
  &:hover {
    background-color: var(--default-color-hover-kubak);
  }
}

/*  style horizontal scroll   */

$common-height: 200px;

.uploaded-image {
  width: 100%;
  height: $common-height;
  border-radius: 4%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-side-container {
  padding-left: 20px;
}

@media (max-width: 767px) {
  .right-side-container {
    padding-left: 0;
  }

  .col-12 {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .right-side-container {
    padding-left: 20px;
  }

  .col-6 {
    width: 50%;
  }
}
</style>
