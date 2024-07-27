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
import { savedRecipes } from '@/store/store.ts'; // Import the global state
import RecipeDisplay from './RecipeDisplay.vue';
</script>

<template>
  <Sheet>
    <SheetTrigger class="fixed md:hidden top-6 z-[3]">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
        <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
      </svg>
    </SheetTrigger>
    <SheetContent side="left">
      <div class="font-bold mb-2">Saved Recipes</div>
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
    </SheetContent>
  </Sheet>
  <div class="hidden md:block h-[600px] min-w-[250px] p-4 rounded-lg border bg-card shadow-sm">
    <div class="font-bold mb-2">Saved Recipes</div>
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
  </div>
</template>