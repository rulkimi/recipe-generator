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

const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
</script>

<template>
  <Card class="h-[600px] min-w-[250px]">
    <CardHeader>
      <CardTitle>Saved Recipes</CardTitle>
    </CardHeader>
    <CardContent>
      <div v-if="savedRecipes && savedRecipes.length" class="flex flex-col gap-2">
        <div
          v-for="recipe in savedRecipes"
          :key="recipe.name"
          class="p-2 rounded-lg border shadow-sm hover:bg-gray-100 cursor-pointer"
        >
          {{ recipe.name }}
        </div>
      </div>
      <div class="text-muted-foreground text-sm" v-else>Start saving your recipe.</div>
    </CardContent>
  </Card>
</template>