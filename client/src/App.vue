<script setup lang="ts">
import SavedRecipes from '@/components/SavedRecipes.vue';
import SearchForm from '@/components/SearchForm.vue';
import DietaryRestrictions from '@/components/DietaryRestrictions.vue';
import GeneratedRecipe from '@/components/GeneratedRecipe.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const question = ref('');
const recipe = ref(null);
const language = ref('malay');

onMounted(() => {
  startServer();
});

const startServer = async () => {
  try {
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`);
  } catch (error) {
    console.error(error)
  }
}

const getRecipe = async () => {
  const formData = {
    question: question.value,
    additional_instructions: ''
  }

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
  }
}
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-[1200px] h-screen flex gap-4 items-start p-4">
      <SavedRecipes />
      <div class="flex-grow flex flex-col gap-4">
        <section>
          <SearchForm
            @generate="getRecipe"
            v-model:question="question"
            v-model:language="language"
          />
        </section>
        <section>
          <DietaryRestrictions />
        </section>
        <section>
          <GeneratedRecipe :recipe="recipe" />
        </section>
      </div>
    </div>
  </div>
</template>
