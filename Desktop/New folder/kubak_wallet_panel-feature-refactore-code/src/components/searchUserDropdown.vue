<template>
  <div class="">
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <ion-icon name="people-outline"></ion-icon>
      </span>
      <span class="w-full">
        <Dropdown
          optionLabel="name"
          :maxSelectedLabels="3"
          closeIcon=""
          class="w-full"
          :selectAll="false"
          panelClass="customFilterMultiSelect"
          :loading="requestStatusStore.loading"
          :options="users"
          v-model="selectedUser"
          v-if="props.singleUser"
        >
          <template #header>
            <div class="p-2 w-full">
              <div class="w-full flex justify-content-around">
                <div class="w-full">
                  <span class="p-input-icon-left w-full">
                    <i class="pi pi-search" />
                    <InputText
                      style="width: 98%"
                      :placeholder="
                        $t('reusables.searchBy', {
                          field: $t(
                            `fields.searchFields.${usersFilterData.searchField}`
                          ),
                        })
                      "
                      v-model="usersFilterData.searchValue"
                      @input="debouncedOnInputChange"
                    />
                  </span>
                </div>
                <div>
                  <Button
                    icon="pi pi-filter"
                    severity="secondary"
                    class="mb-1"
                    @click="
                      () => {
                        showUserFilterFieldOptions =
                          !showUserFilterFieldOptions;
                      }
                    "
                  />

                  <div
                    class="w-full listBox flex flex-column justify-content-center align-items-center p-2"
                    v-if="showUserFilterFieldOptions"
                  >
                    <div
                      v-for="field in userSearchFields"
                      :key="field.id"
                      class="listbox-item my-1"
                      @click="changeFilterField(field)"
                      :class="
                        field == usersFilterData.searchField ? 'active' : ''
                      "
                    >
                      {{ $t(`fields.searchFields.${field}`) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #option="data">
            <div class="flex align-items-center">
              <img
                :src="getImage(data.option.photoUrl)"
                class="h-2rem w-2rem border-circle mx-2"
              />
              {{ data.option.displayName }}
            </div>
          </template>
          <template #value>
            {{
              selectedUser
                ? selectedUser.displayName
                : props.placeholder ?? $t("fields.user")
            }}
          </template>
        </Dropdown>
        <div v-else>
          <MultiSelect
            optionLabel="name"
            placeholder="Select Cities"
            :maxSelectedLabels="3"
            closeIcon=""
            class="w-full"
            :selectAll="false"
            panelClass="customFilterMultiSelect"
            :loading="requestStatusStore.loading"
            :options="users"
            v-model="selectedUsers"
          >
            <template #header>
              <div class="p-2 w-full">
                <div class="w-full flex justify-content-around">
                  <div class="w-full">
                    <span class="p-input-icon-left w-full">
                      <i class="pi pi-search" />
                      <InputText
                        style="width: 98%"
                        :placeholder="
                          $t('reusables.searchBy', {
                            field: $t(
                              `fields.searchFields.${usersFilterData.searchField}`
                            ),
                          })
                        "
                        v-model="usersFilterData.searchValue"
                        @input="debouncedOnInputChange"
                      />
                    </span>
                  </div>

                  <div>
                    <Button
                      icon="pi pi-filter"
                      severity="secondary"
                      class="mb-1"
                      @click="
                        () => {
                          showUserFilterFieldOptions =
                            !showUserFilterFieldOptions;
                        }
                      "
                    />

                    <div
                      class="w-full listBox flex flex-column justify-content-center align-items-center p-2"
                      v-if="showUserFilterFieldOptions"
                    >
                      <div
                        v-for="field in userSearchFields"
                        :key="field.id"
                        class="listbox-item my-1"
                        @click="changeFilterField(field)"
                        :class="
                          field == usersFilterData.searchField ? 'active' : ''
                        "
                      >
                        {{ $t(`fields.searchFields.${field}`) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #option="data">
              <img
                :src="getImage(data.option.photoUrl)"
                class="h-2rem w-2rem border-circle mx-2"
              />
              {{ data.option.displayName }}
            </template>
            <template #value>
              {{
                selectedUsers && selectedUsers.length > 0
                  ? selectedUsers.length < 4
                    ? selectedUsers.map((x: any) => x.displayName).join(" , ")
                    : `${selectedUsers.length}  ${$t(
                        "dropdowns.selected_field",
                        {
                          field: $t("fields.user"),
                        }
                      )}`
                  : props.placeholder ?? $t("fields.user")
              }}
            </template>
          </MultiSelect>
        </div>
      </span>
    </div>
    <div
      class="col-12 px-0"
      v-if="
        selectedUsers &&
        selectedUsers.length > 0 &&
        props.showSelectedUsersAsAccordion
      "
    >
      <Accordion>
        <AccordionTab header="Selected Users">
          <div
            class="flex w-full flex-wrap justify-content-center overflow-y-auto"
            style="max-height: 300px"
          >
            <div v-for="user of selectedUsers" :key="user.id" class="m-2">
              <div
                style="
                  min-height: 50px;
                  width: 150px;
                  border-radius: 6px;
                  background-color: var(--background-color-kubak);
                "
              >
                <div
                  class="w-full p-2 flex justify-content-between align-items-center"
                >
                  <img
                    :src="getImage(user.photoUrl ?? user.photoUrl)"
                    class="h-3rem w-3rem border-circle"
                  />
                  <p>{{ user.displayName }}</p>
                  <div
                    class="p-1 closeIcon"
                    style="border-radius: 4px; cursor: pointer"
                  >
                    <ion-icon
                      name="close-circle-outline"
                      class="text-xl mt-1"
                      @click="removeUser(user)"
                    ></ion-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UserSearchFieldEnum, UserService } from "@/backend/auth";
import { requestStatus } from "@/stores/common/requestStatus";
import { debounce } from "@/utils/debounce";
import { onMounted, ref, watch } from "vue";
import { getImage } from "@/composables/getImage";
import AccordionTab from "primevue/accordiontab";
import Accordion from "primevue/accordion";
const emit = defineEmits(["selectedUsers", "selectedUser"]);

const props = defineProps([
  "users",
  "singleUser",
  "existingUser",
  "placeholder",
  "showSelectedUsersAsAccordion",
]);
const requestStatusStore = requestStatus();

const userSearchFields = Object.keys(UserSearchFieldEnum).map(
  (key) => UserSearchFieldEnum[key]
);
const showUserFilterFieldOptions = ref(false);
const selectedUsers = ref<any>(props.existingUser ?? []);
const selectedUser = ref(props.existingUser ?? null);
const usersFilterData = ref({
  searchField: UserSearchFieldEnum.NAME_FIELD,
  searchValue: "",
});

const users = ref<{ photoUrl: string; displayName: string; uid: string }[]>([]);

watch(
  () => props.users,
  () => {
    if (!props.users) return;
  }
);
watch(
  () => props.existingUser,
  () => {
    if (!props.existingUser) return;
    selectedUsers.value = props.existingUser;
    selectedUser.value = props.existingUser;
  }
);

function addUserToSelected(newUser: any) {
  if (
    !selectedUsers.value.some((existingUser) => existingUser.id === newUser.id)
  ) {
    selectedUsers.value.push(newUser);
  } else {
    emit("selectedUsers", newUser);
  }
}

onMounted(() => {
  if (props.users) {
    props.users.forEach((user) => addUserToSelected(user));
  }
  getAllUsers();
});

async function getAllUsers() {
  const response = await UserService.getUsers(usersFilterData.value);
  const newUsers = response.items?.map((user) => {
    return {
      photoUrl: user.photoUrl,
      displayName: user.displayName,
      uid: user.uid,
    };
  });
  users.value = newUsers as any;
  // Check if existingUser
  if (props.existingUser) {
    const foundExistingUser = newUsers?.find(
      (user) => user.uid === props.existingUser.id
    );
    if (foundExistingUser) {
      selectedUser.value = foundExistingUser;
    }
  }
}

const debouncedOnInputChange = debounce(getAllUsers, 500);

function changeFilterField(field) {
  usersFilterData.value.searchField = field;
  setTimeout(() => {
    showUserFilterFieldOptions.value = false;
  }, 100);
}

watch(
  () => selectedUsers.value,
  () => {
    emit("selectedUsers", selectedUsers.value);
  }
);
watch(
  () => selectedUser.value,
  () => {
    emit("selectedUser", selectedUser.value);
  }
);
function removeUser(user) {
  selectedUsers.value = selectedUsers.value?.filter((x) => x.uid !== user.uid);
}
</script>

<style lang="scss">
.customFilterMultiSelect {
  .p-multiselect-header {
    display: none !important;
  }
}
.listBox {
  position: absolute;
  width: 100px !important;
  margin: 0 10px;
  z-index: 2000000000000;
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
</style>
