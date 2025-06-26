import { ref, watchEffect } from 'vue';

const savedRecipes = ref(JSON.parse(localStorage.getItem('savedRecipes') || '[]'));

watchEffect(() => {
  savedRecipes.value = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
});

const deleteRecipe = (index: number) => {
  if (index >= 0 && index < savedRecipes.value.length) {
    savedRecipes.value.splice(index, 1);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes.value));
  }
}

export { savedRecipes, deleteRecipe };