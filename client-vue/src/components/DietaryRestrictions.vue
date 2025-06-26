<script setup>
import { ref } from 'vue';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const checkboxes = ref([
  { id: 'halal', label: 'Halal', checked: true },
  { id: 'vegan', label: 'Vegan', checked: false },
  { id: 'vegetarian', label: 'Vegetarian', checked: false },
  { id: 'nondairy', label: 'Non-dairy', checked: false },
]);

const toggleCheckbox = (checkbox) => {
  checkbox.checked = !checkbox.checked;
};
</script>

<template>
  <div class="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
    <div class="flex gap-2">
      <div class="font-bold mb-2">Dietary Restrictions</div>
      <div>
        <Badge variant="outline">Coming Soon</Badge>
      </div>
    </div>
    <div class="grid grid-rows-2 grid-flow-col md:flex md:gap-10">
      <div 
        v-for="checkbox in checkboxes" 
        :key="checkbox.id" 
        class="flex items-center gap-2"
      >
        <Checkbox 
          :id="checkbox.id" 
          :checked="checkbox.checked" 
          @click="toggleCheckbox(checkbox)"
        />
        <label :for="checkbox.id">{{ checkbox.label }}</label>
      </div>
    </div>
  </div>
</template>
