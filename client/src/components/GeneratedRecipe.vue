<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { onMounted } from 'vue';
import RecipeDisplay from '@/components/RecipeDisplay.vue';

const emit = defineEmits(['save-recipe']);

const props = defineProps({
  recipe: {
    type: [Object, null],
    required: true,
  }
});

onMounted(() => {
  console.log(props.recipe)
})
</script>

<template>
  <div class="max-h-[500px] p-4 rounded-lg border bg-card text-card-foreground overflow-auto shadow-sm">
    <div class="font-bold mb-2 flex justify-between">
      <span>Generated Recipe</span>
      <span
        v-if="props.recipe"
        class="underline cursor-pointer"
        @click="emit('save-recipe')"
      >
        Save
      </span>
    </div>
    <div v-if="props.recipe">
      <RecipeDisplay :recipe="props.recipe" />
    </div>
    <div v-else class="text-sm text-muted-foreground">Generated recipe will appear here.</div>
  </div>
</template>