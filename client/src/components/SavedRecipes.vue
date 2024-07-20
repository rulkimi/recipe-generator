<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ref } from 'vue';

const savedRecipes = ref([
  { title: 'Ayam masak merah', recipe: {} },
  { title: 'Nasi Lemak', recipe: {} },
  { title: 'Rendang Ayam', recipe: {} },
  { title: 'Gulai Rebung', recipe: {} },
]);
</script>

<template>
  <Card class="h-[600px] min-w-[250px]">
    <CardHeader>
      <CardTitle>Saved Recipes</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-2">
        <div
          v-for="recipe in savedRecipes"
          :key="recipe.title"
          class="p-2 rounded-lg border shadow-sm hover:bg-gray-100 cursor-pointer"
        >
          {{ recipe.title }}
        </div>
      </div>
    </CardContent>
  </Card>
</template>