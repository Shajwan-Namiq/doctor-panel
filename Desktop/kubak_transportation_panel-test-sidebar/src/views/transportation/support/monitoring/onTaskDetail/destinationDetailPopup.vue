<template>
  <div>
    <div
      :style="`background-color: ${
        destination.status == 'Active' ? '#05bb00' : '#717171'
      }; height: 30px; width: 30px;color:white`"
      class="flex justify-content-center align-items-center border-circle -mx-3 -my-2"
    >
      <div class="mt-1">
        {{ destination.step }}
      </div>
    </div>
    <div class="grid" style="min-width: 300px">
      <div class="flex align-items-center my-2 col-4">
        <div>
          <ion-icon name="analytics-outline" class="text-2xl"></ion-icon>
        </div>
        <div
          class="mx-2 flex flex-column justify-content-center align-items-center"
        >
          <div>Distance</div>
          <div>
            {{ destination.distance }}
          </div>
        </div>
      </div>
      <div class="flex align-items-center my-2 col-4">
        <div>
          <ion-icon name="time-outline" class="text-2xl"></ion-icon>
        </div>
        <div
          class="mx-2 flex flex-column justify-content-center align-items-center"
        >
          <div>duration</div>
          <div>
            {{ destination.duration }}
          </div>
        </div>
      </div>
      <div class="flex align-items-center my-2 col-4">
        <div>
          <ion-icon name="cash-outline" class="text-2xl"></ion-icon>
        </div>
        <div
          class="mx-2 flex flex-column justify-content-center align-items-center"
        >
          <div>price</div>
          <div>
            {{ destination.price }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex align-items-center p-2 my-3 justify-content-center border-round-lg"
      :style="`background-color: var(--background-color-kubak);border: 1px solid ${
        destination.status == 'Active' ? '#05bb00' : '#717171'
      };`"
    >
      <div>
        <ion-icon name="location-outline" class="text-2xl"></ion-icon>
      </div>
      <div
        class="mx-2 flex flex-column justify-content-center align-items-center"
      >
        <div>
          {{ destination.targetLocationTitle }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";

interface Destination {
  distance: number;
  duration: number;
  price: number;
  status: string;
  step: number;
  targetLocationTitle: string;
}
const props = defineProps(["destination"]);

const destination = ref<Destination>(props.destination);

watch(
  () => props.destination,
  () => {
    destination.value = props.destination;
  }
);
</script>
