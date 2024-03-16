<template>
  <div>
    <Avatar
      class="w-7rem h-7rem my-4"
      shape="circle"
      :image="getImage(userDetail?.user?.photoUrl)"
    />
    <div class="grid mb-4" style="width: 100% !important">
      <div
        class="col-12 lg:col-6 xl:col-4 mb-2"
        v-for="(data, index) in showData"
        :key="index"
      >
        <p class="m-1">
          {{
            $t(
              `transportation.passenger.${
                data.field.split(".")[data.field.split(".").length - 1]
              }`
            )
          }}
        </p>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <ion-icon
              :name="`${data.icon}-outline`"
              class="text-2xl"
            ></ion-icon>
          </span>
          <span class="p-float-label">
            <InputText autofocus id="inputgroup" type="text" :disabled="true" />
            <label for="inputgroup">
              {{
                data.field
                  .replace(/\[|\]\.?/g, ".")
                  .split(".")
                  .filter((s) => s)
                  .reduce((acc, val) => acc && acc[val], userDetail)
              }}
            </label>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import InputText from "primevue/inputtext";
import { ref } from "vue";
import Avatar from "primevue/avatar";
import { getImage } from "@/composables/getImage";

const props = defineProps(["userDetail"]);
const userDetail = props.userDetail;
const showData = ref([
  {
    field: "user.displayName",
    icon: "text",
  },
  {
    field: "user.phoneNumber",
    icon: "call",
  },
  {
    field: "user.email",
    icon: "mail",
  },
  {
    field: "user.region.name",
    icon: "home",
  },
  {
    field: "user.language",
    icon: "language",
  },
  {
    field: "user.gender",
    icon: "person",
  },
]);
</script>
