<script setup>
import { ref } from 'vue';
import { Checkbox } from '@/components/ui/checkbox';

const checkboxes = ref([
  { id: 'halal', label: 'Halal' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'nondairy', label: 'Non-dairy' },
])
</script>

<template>
  <div class="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
    <div class="font-bold mb-2">Dietary Restrictions</div>
    <div class="flex gap-10">
      <div v-for="checkbox in checkboxes" class="flex items-center gap-2">
        <Checkbox :id="checkbox.id"/>
        <label :for="checkbox.id">{{ checkbox.label }}</label>
      </div>
    </div>
  </div>
</template>