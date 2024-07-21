<script setup lang="ts">
import SavedRecipes from '@/components/SavedRecipes.vue';
import SearchForm from '@/components/SearchForm.vue';
import DietaryRestrictions from '@/components/DietaryRestrictions.vue';
import GeneratedRecipe from '@/components/GeneratedRecipe.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { savedRecipes } from '@/store/store.ts';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'vue-sonner';

const question = ref('');
const recipe = ref<any>(null);
const language = ref('malay');
const loading = ref(false);
const serverLoading = ref(false);

onMounted(() => {
  startServer();
});

const startServer = async () => {
  serverLoading.value = true;
  try {
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`);
  } catch (error) {
    console.error(error)
  } finally {
    serverLoading.value = false;
  }
}

const getRecipe = async () => {
  const formData = {
    question: question.value,
    additional_instructions: ''
  }

  loading.value = true;

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generate`, formData, {
      params: {
        language: language.value
      }
    });
    const { data } = response.data;

    recipe.value = data.recipe;
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false;
  }
}

const saveRecipe = () => {
  const savedRecipesArray = savedRecipes.value.slice(); // create a copy of the array
  savedRecipesArray.push(recipe.value);
  localStorage.setItem('savedRecipes', JSON.stringify(savedRecipesArray));
  savedRecipes.value = savedRecipesArray; // update the global state

  if (recipe.value) {
    toast('Recipe has been created', { description: recipe.value.name });
  }
};
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-[1200px] h-screen flex gap-4 items-start px-4 pb-4 pt-20">
      <SavedRecipes />
      <div class="flex-grow flex flex-col gap-4">
        <template v-if="!serverLoading">
          <section>
            <SearchForm
              @generate="getRecipe"
              v-model:question="question"
              v-model:language="language"
              :loading="loading"
            />
          </section>
          <section>
            <DietaryRestrictions />
          </section>
          <section>
            <GeneratedRecipe :recipe="recipe" @save-recipe="saveRecipe" :loading="loading" />
          </section>
        </template>
        <template v-else>
          <span class="animate-pulse">
            We're getting things ready on our server, which is running on the free tier of
            <a href="https://render.com/" target="_blank" class="underline">Render.com</a>.
            This might take a moment. While you wait, feel free to explore your saved recipes. Thank you for your patience!
          </span>
        </template>
      </div>
    </div>
  </div>
  <Toaster />
</template>
