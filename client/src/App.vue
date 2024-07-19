<template>
  <div class="bg-gray-200 w-full h-screen flex justify-center items-start">
    <div class="flex flex-col gap-4">
      <div class="flex gap-2">
        <input type="text" v-model="question" class="rounded-lg px-2 p-1" placeholder="Type food name">
        <button @click="getRecipe" class="bg-white py-1 px-2 rounded-lg">Generate Recipe</button>
      </div>
      <div v-if="recipe">
        <div>{{ recipe.name }}</div>
        <p class="font-bold">Ingredients</p>
        <ul class="list-disc">
          <li v-for="ingredient in recipe.ingredients" :key="ingredient">
            {{ ingredient.name }}, <i>{{ ingredient.amount }}</i>
          </li>
        </ul>
        <p class="font-bold">Steps</p>
        <ol class="list-decimal">
          <li v-for="step in recipe.steps" :key="step">
            <p>{{ step.description }}</p>
            <i>Tips: {{ step.tips }}</i>
          </li>
        </ol>
        <p class="font-bold">Suggested Pairings</p>
        <ol class="list-decimal">
          <li v-for="pairings in recipe.suggested_pairings" :key="pairings">
            <p>{{ pairings.dish_name }}</p>
            <i>{{ pairings.description }}</i>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const question = ref('masak lemak cili api')
const recipe = ref(null)

const getRecipe = async () => {
  const formData = {
    question: question.value,
    additional_instructions: ''
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generate`, formData);
    const { data, status, message } = response.data;

    recipe.value = data.recipe;
  } catch (error) {
    console.error(error)
  }
}
</script>