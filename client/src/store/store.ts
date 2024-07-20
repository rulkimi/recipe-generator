import { ref, watchEffect } from 'vue';

const savedRecipes = ref(JSON.parse(localStorage.getItem('savedRecipes') || '[]'));

watchEffect(() => {
  savedRecipes.value = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
});

export { savedRecipes };