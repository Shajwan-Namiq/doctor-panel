<template>
  <div class="star-rating">
    <svg v-for="star in 5" :key="star" class="star" viewBox="0 0 24 24">
      <!-- Background star (grey) -->
      <path d="M12 2l3 7h8l-6 4.5l2 8L12 17l-7 5l2-8L1 9h8z" fill="grey"></path>

      <!-- Foreground star (gold), clipped -->
      <path
        d="M12 2l3 7h8l-6 4.5l2 8L12 17l-7 5l2-8L1 9h8z"
        fill="gold"
        :clip-path="getClipPath(star)"
      ></path>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  modelValue: Number,
});

const rating = ref(props.modelValue || 0);

const getClipPath = (star: number) => {
  if (star <= rating.value) {
    return "none"; // fully visible
  } else if (star - 1 < rating.value) {
    const percentage = (rating.value - star + 1) * 100;
    return `polygon(0% 0%, ${percentage}% 0%, ${percentage}% 100%, 0% 100%)`;
  }
  return "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"; // completely clipped
};
</script>

<style scoped>
.star-rating {
  display: flex;
  gap: 4px;
}

.star {
  width: 24px;
  height: 24px;
}
</style>
