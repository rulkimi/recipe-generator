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
      <!-- Recipe Name -->
      <div class="text-2xl font-bold mb-4">{{ props.recipe.name }}</div>

      <!-- Ingredients -->
      <div class="mb-4">
        <p class="text-xl font-semibold mb-2">Ingredients</p>
        <ul class="list-disc pl-5 space-y-2">
          <li v-for="ingredient in props.recipe.ingredients" :key="ingredient.name" class="flex items-center space-x-2">
            <span class="font-medium">{{ ingredient.name }}</span>, 
            <span class="italic text-gray-600">{{ ingredient.amount }}</span>
          </li>
        </ul>
      </div>

      <!-- Steps -->
      <div class="mb-4">
        <p class="text-xl font-semibold mb-2">Steps</p>
        <ol class="list-decimal pl-5 space-y-4">
          <li v-for="step in props.recipe.steps" :key="step.description" class="space-y-1">
            <p>{{ step.description }}</p>
            <p class="italic text-gray-600">Tips: {{ step.tips }}</p>
          </li>
        </ol>
      </div>

      <!-- Suggested Pairings -->
      <div>
        <p class="text-xl font-semibold mb-2">Suggested Pairings</p>
        <ol class="list-decimal pl-5 space-y-4">
          <li v-for="pairing in props.recipe.suggested_pairings" :key="pairing.dish_name" class="space-y-1">
            <p class="font-medium">{{ pairing.dish_name }}</p>
            <p class="italic text-gray-600">{{ pairing.description }}</p>
          </li>
        </ol>
      </div>
    </div>
    <div v-else class="text-sm text-muted-foreground">Generated recipe will appear here.</div>

  </div>
</template>