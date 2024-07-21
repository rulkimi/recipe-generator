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
  },
  loading: {
    type: Boolean,
    required: true
  }
});

onMounted(() => {
  console.log(props.recipe)
})
</script>

<template>
  <div class="max-h-screen md:max-h-[500px] p-4 rounded-lg border bg-card text-card-foreground overflow-auto shadow-sm">
    <div class="font-bold mb-2 flex justify-between">
      <span>Generated Recipe</span>
      <span
        v-if="props.recipe && !loading"
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
    <div v-else-if="props.recipe">
      <RecipeDisplay :recipe="props.recipe" />
    </div>
    <div v-else class="text-sm text-muted-foreground">Generated recipe will appear here.</div>
  </div>
</template>