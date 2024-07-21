<script setup>
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { savedRecipes } from '@/store/store.ts'; // Import the global state
import RecipeDisplay from './RecipeDisplay.vue';
</script>

<template>
  <Card class="h-[600px] min-w-[250px]">
    <CardHeader>
      <CardTitle>Saved Recipes</CardTitle>
    </CardHeader>
    <CardContent>
      <div v-if="savedRecipes.length" class="flex flex-col gap-2">
        <!-- <div
          v-for="recipe in savedRecipes"
          :key="recipe.name"
          class="p-2 rounded-lg border shadow-sm hover:bg-gray-100 cursor-pointer"
        >
          {{ recipe.name }}
        </div> -->
        <Dialog
          v-for="recipe in savedRecipes"
          :key="recipe.name"
        >
          <DialogTrigger class="p-2 rounded-lg border shadow-sm hover:bg-gray-100 cursor-pointer text-start">{{ recipe.name }}</DialogTrigger>
          <DialogContent >
            <DialogHeader>
              <DialogTitle>{{ recipe.name }}</DialogTitle>
              <DialogDescription class="overflow-y-scroll max-h-[600px]">
                <RecipeDisplay no-title :recipe="recipe" />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div class="text-muted-foreground text-sm" v-else>Start saving your recipe.</div>
    </CardContent>
  </Card>
</template>