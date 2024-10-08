<script setup>
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RecipeDisplay from './RecipeDisplay.vue';

import { savedRecipes, deleteRecipe } from '@/store/store.ts';
import { ref } from 'vue';

const showDeleteConfirmation = ref(false);

</script>

<template>
  <!-- mobile view -->
  <Sheet>
    <SheetTrigger class="fixed md:hidden top-6 z-[3]">
      <img src="../assets/burger-menu.svg" alt="burger-menu" />
    </SheetTrigger>
    <SheetContent side="left">
      <div class="font-bold mb-2">Saved Recipes</div>
      <div v-if="savedRecipes.length" class="flex flex-col gap-2">
        <Dialog
          v-for="recipe in savedRecipes"
          :key="recipe.name"
        >
          <DialogTrigger class="p-2 rounded-lg border shadow-sm hover:bg-gray-100 cursor-pointer text-start">{{ recipe.name }}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{{ recipe.name }}</DialogTitle>
              <DialogDescription class="overflow-y-scroll max-h-[600px]">
                <RecipeDisplay no-title :recipe="recipe" />
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <div class="flex justify-end gap-4">
                <div v-if="showDeleteConfirmation" class="flex gap-4">
                  <span>Are you sure to delete this recipe?</span>
                  <button @click="deleteRecipe(index)">Yes</button>
                  <button @click="showDeleteConfirmation = false">Cancel</button>
                </div>
                <button v-else @click="showDeleteConfirmation = true">Delete</button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div class="text-muted-foreground text-sm" v-else>Start saving your recipe.</div>
    </SheetContent>
  </Sheet>

  <!-- desktop view -->
  <div class="hidden md:block h-[calc(100vh-97px)] min-w-[250px] p-4 rounded-lg border bg-card shadow-sm overflow-auto">
    <div class="font-bold mb-2">Saved Recipes</div>
    <div v-if="savedRecipes.length" class="flex flex-col gap-2">
      <Dialog
        v-for="(recipe, index) in savedRecipes"
        :key="recipe.name"
      >
        <DialogTrigger class="p-2 rounded-lg border shadow-sm hover:bg-gray-100 cursor-pointer text-start">{{ recipe.name }}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{{ recipe.name }}</DialogTitle>
            <DialogDescription class="overflow-y-scroll max-h-[600px]">
              <RecipeDisplay no-title :recipe="recipe" />
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <div class="flex justify-end gap-4">
              <div v-if="showDeleteConfirmation" class="flex gap-4">
                <span>Are you sure to delete this recipe?</span>
                <button @click="deleteRecipe(index)">Yes</button>
                <button @click="showDeleteConfirmation = false">Cancel</button>
              </div>
              <button v-else @click="showDeleteConfirmation = true">Delete</button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <div class="text-muted-foreground text-sm" v-else>Start saving your recipe.</div>
  </div>
</template>