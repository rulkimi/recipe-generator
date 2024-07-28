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
const searchType = ref('name');
const errorMessage = ref('');
const imageFile = ref<File | null>(null);

onMounted(() => {
  startServer();
});

const startServer = async () => {
  serverLoading.value = true;
  try {
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`);
  } catch (error) {
    console.error(error);
  } finally {
    serverLoading.value = false;
  }
}

const getRecipe = async () => {
  errorMessage.value = '';

  const formData = new FormData();
  formData.append('additional_instructions', '');
  formData.append('dietary_restrictions', '');

  loading.value = true;

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generate`, formData, {
      params: {
        question: question.value,
        language: language.value
      }
    });
    const { data } = response.data;

    recipe.value = data.recipe;
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Error getting the recipe. Please try again.';
  } finally {
    loading.value = false;
  }
}

const getRecipeByIngredients = async () => {
  errorMessage.value = '';

  loading.value = true;
  const formData = new FormData();
  console.log(question.value)
  formData.append('ingredients', question.value);
  formData.append('additional_instructions', '');
  formData.append('dietary_restrictions', '');

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generate_by_ingredients`, formData, {
      params: {
        language: language.value
      }
    });
    const { data } = response.data;

    recipe.value = data.recipe;
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Error getting the recipe. Please try again.';
  } finally {
    loading.value = false;
  }
}

const uploadImage = async (file: File) => {
  errorMessage.value = '';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('additional_instructions', '');
  formData.append('dietary_restrictions', '');

  loading.value = true;

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload_image/`, formData, {
      params: {
        language: language.value
      }
    });
    const { data } = response.data;

    recipe.value = data.recipe;
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Error getting the recipe. Please try again.';
  } finally {
    loading.value = false;
  }
}

const generateRecipe = () => {
  console.log(searchType.value);
  if (searchType.value === 'ingredients') {
    getRecipeByIngredients();
  } else if (searchType.value === 'image' && imageFile.value) {
    uploadImage(imageFile.value);
  } else {
    getRecipe();
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

const searchBy = (mode: string) => {
  searchType.value = mode;
}

const handleUploadImage = (file: File) => {
  imageFile.value = file;
  uploadImage(file);
}

</script>

<template>
  <div class="w-full flex justify-center">
    <div class="fixed flex justify-center items-center gap-4 h-[70px] w-full bg-white/90 z-[2]">
      <h4 class="text-2xl font-bold">Recipe Generator</h4>
      <a href="https://github.com/rulkimi/recipe-generator" target="_blank" class="cursor-pointer transition duration-200 hover:scale-110">
        <img src="./assets/github-mark.png" width="24" alt="rulkimi recipe generator github" />
      </a>
    </div>
    <div class="w-full max-w-[1200px] h-screen flex gap-4 items-start px-4 pb-4 pt-20">
      <SavedRecipes />
      <div class="flex-grow flex flex-col gap-4">
        <template v-if="!serverLoading">
          <section>
            <SearchForm
              v-model:question="question"
              v-model:language="language"
              :loading="loading"
              @search-by="searchBy"
              @generate="generateRecipe"
              @upload-image="handleUploadImage"
            />
          </section>
          <section>
            <DietaryRestrictions />
          </section>
          <section>
            <GeneratedRecipe :recipe="recipe" @save-recipe="saveRecipe" :loading="loading" :error-message="errorMessage" />
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
