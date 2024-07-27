<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'; // Adjust the import path as needed

import { ref, watch } from 'vue';
import RecipeDisplay from '@/components/RecipeDisplay.vue';

const emit = defineEmits(['save-recipe']);

const props = defineProps({
  recipe: {
    type: [Object, null, Array],
    required: true,
  },
  loading: {
    type: Boolean,
    required: true
  }
});
const isArray = ref(false);

watch(() => props.recipe, (newValue) => {
  // Check if newValue is not null and is an array
  if (Array.isArray(newValue)) {
    isArray.value = newValue.length > 0;
  } else {
    isArray.value = false;
  }
  console.log(isArray.value)
}, { immediate: true });
</script>

<template>
  <div class="max-h-screen md:max-h-[500px] md:overflow-auto p-4 rounded-lg border bg-card shadow-sm">
    <div class="font-bold mb-2 flex justify-between">
      <span>Generated Recipe</span>
      <span
        v-if="props.recipe && !loading && !isArray"
        class="underline cursor-pointer"
        @click="emit('save-recipe')"
      >
        Save
      </span>
    </div>
    <div v-if="loading">
      <div class='flex space-x-1 justify-start items-center mt-3'>
        <div class='h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div class='h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div class='h-2 w-2 bg-gray-400 rounded-full animate-bounce'></div>
      </div>
    </div>
    <div v-else-if="isArray">
      <Accordion v-if="isArray && props.recipe.length" type="single" class="w-full" collapsible>
        <AccordionItem v-for="(recipe, index) in props.recipe" :key="index" :value="`item-${index}`">
          <AccordionTrigger>{{ recipe.name }}</AccordionTrigger>
          <AccordionContent>
            <RecipeDisplay :recipe="recipe" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    <div v-else-if="props.recipe">
      <RecipeDisplay :recipe="props.recipe" />
    </div>
    <div v-else class="text-sm text-muted-foreground">Generated recipe will appear here.</div>
  </div>
</template>