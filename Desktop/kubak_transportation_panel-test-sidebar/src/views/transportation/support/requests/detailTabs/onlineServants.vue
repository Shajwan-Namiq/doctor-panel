<template>
  <div class="">
    <TableComponent
      :tableInformation="tableInformation"
      :response="onlineServants"
      @clickedFirstCell="detail"
    />
  </div>
</template>
<script lang="ts" setup>
import TableComponent from "@/common/interfaces/tableComponent.vue";
import { useRoute, useRouter } from "vue-router";
import { RequestService } from "@/backend/transport";
import { ref } from "vue";

const tableInformation = {
  clickFirstCell: true,
  hideAddDialog: true,
  headers: [
    {
      field: "firstName",
      header: "transportation.servant.firstName",
      clickable: true,
    },
    { field: "lastName", header: "transportation.servant.lastName" },
    { field: "mobile", header: "transportation.servant.mobile" },
    {
      field: "distance",
      header: "transportation.servant.distance",
    },
  ],
};
const router = useRouter();
const route = useRoute();

const filterData = ref({
  page: 0,
  id: +route.params.id,
});
const onlineServants = ref();
getOnlineServants();
function getOnlineServants() {
  RequestService.getRequestOnlineServant(filterData.value).then((Response) => {
    onlineServants.value = Response;
  });
}
function detail(data) {
  router.push({
    name: "detailServant",
    params: {
      id: data?.id,
    },
  });
}
</script>
