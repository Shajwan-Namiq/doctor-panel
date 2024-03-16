<template>
  <div class="cardWrapper mb-6">
    <div class="py-4 px-2">
      <h6 class="dashboardTableTitle">
        {{ $t("transportation.Dashboard.Table.LastServants") }}
      </h6>
      <p class="dashboardTableDesc">
        {{ $t("transportation.Dashboard.Table.LastServantsDesc") }}
      </p>
    </div>
    <DataTable
      :value="servants"
      responsiveLayout="scroll"
      :loading="requestStatusStore.loading"
      :lazy="true"
    >
      <Column :header="$t('transportation.Servant.Avatar')">
        <template #body>
          <img
            :src="'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg'"
            style="width: 30px; border-radius: 50%; height: 30px"
          />
        </template>
      </Column>
      <Column :header="$t('transportation.Servant.FirstName')">
        <template #body="slotProps">
          {{ slotProps.data.Servant.FirstName }}
        </template>
      </Column>
      <Column :header="$t('transportation.Servant.LastName')">
        <template #body="slotProps">
          {{ slotProps.data.Servant.LastName }}
        </template>
      </Column>
      <Column :header="$t('transportation.Servant.Mobile')">
        <template #body="slotProps">
          {{ slotProps.data.Servant.User.Mobile }}
        </template>
      </Column>
    </DataTable>
    <div class="tableSeeMore flex justify-content-end p-2">
      <div class="seeMore flex" @click="seeMore">
        <p>{{ $t("transportation.Dashboard.Table.SeeMore") }}</p>
        <ion-icon
          :name="`chevron-${direction === 'rtl' ? 'back' : 'forward'}-outline`"
          :style="`margin-top: ${direction === 'rtl' ? 6 : 2}px`"
        ></ion-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { ref } from "vue";
import { requestStatus } from "@/stores/common/requestStatus";
import { useRouter } from "vue-router";
import { ServantService } from "@/backend/transport";

const requestStatusStore = requestStatus();
const router = useRouter();
const servants = ref();
const direction = localStorage.getItem("direction");
getServants();
function getServants() {
  ServantService.listServants({ page: 0, limit: 5 }).then((Response) => {
    servants.value = Response?.items;
  });
}
function seeMore() {
  router.push({
    name: "listServant",
  });
}
</script>
