<script setup>
const props = defineProps({
  recipe: {
    type: Object,
    required: true
  },
  noTitle: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <!-- Recipe Name -->
  <div v-if="!noTitle" class="text-2xl font-bold mb-4">{{ props.recipe.name }}</div>

  <!-- Ingredients -->
  <div class="mb-4">
    <p class="text-xl font-semibold mb-2">Ingredients</p>
    <ul class="list-disc pl-5 space-y-2">
      <li v-for="ingredient in props.recipe.ingredients" :key="ingredient.name" class="flex items-center space-x-2">
        <span class="font-medium">{{ ingredient.name }}</span>, 
        <span class="italic text-gray-600">{{ ingredient.amount }}</span>
      </li>
    </ul>
  </div>

  <!-- Steps -->
  <div class="mb-4">
    <p class="text-xl font-semibold mb-2">Steps</p>
    <ol class="list-decimal pl-5 space-y-4">
      <li v-for="step in props.recipe.steps" :key="step.description" class="space-y-1">
        <p>{{ step.description }}</p>
        <p v-if="step.tips" class="italic text-gray-600">Tips: {{ step.tips }}</p>
      </li>
    </ol>
  </div>

  <!-- Suggested Pairings -->
  <div v-if="props.recipe.suggested_pairings.length">
    <p class="text-xl font-semibold mb-2">Suggested Pairings</p>
    <ol class="list-decimal pl-5 space-y-4">
      <li v-for="pairing in props.recipe.suggested_pairings" :key="pairing.dish_name" class="space-y-1">
        <p class="font-medium">{{ pairing.dish_name }}</p>
        <p class="italic text-gray-600">{{ pairing.description }}</p>
      </li>
    </ol>
  </div>
</template>