<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { ThumbsDown, ThumbsUp } from 'lucide-vue-next';
import { Primitive } from 'radix-vue';
import { ref, watch } from 'vue';
import RecipeDisplay from '@/components/RecipeDisplay.vue';

const emit = defineEmits(['save-recipe']);

const props = defineProps({
  recipe: {
    type: [Object, null, Array],
    required: true,
  },
  loading: {
    type: Boolean,
    required: true
  },
  errorMessage: {
    type: String,
    default: ''
  },
  logId: {
    type: String,
    default: ''
  }
});

const isArray = ref(false);
watch(() => props.recipe, (newValue) => {
  if (Array.isArray(newValue)) {
    isArray.value = newValue.length > 0;
  } else {
    isArray.value = false;
  }
}, { immediate: true });

const selectedFeedback = ref('');
const submittingFeedback = ref(false);

async function sendFeedback(value) {
  if (!props.logId || submittingFeedback.value) return;

  submittingFeedback.value = true;
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/feedback/${props.logId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback: value }),
    });

    if (!res.ok) throw new Error(await res.text());

    selectedFeedback.value = value;
  } catch (e) {
    console.error('Failed to submit feedback:', e);
  } finally {
    submittingFeedback.value = false;
  }
}

function toggleFeedback(value) {
  if (selectedFeedback.value === value) {
    selectedFeedback.value = '';
    // Optionally re-send null feedback if backend supports it
  } else {
    sendFeedback(value);
  }
}
</script>

<template>
  <div class="md:h-[calc(100vh-260px)] md:overflow-auto p-4 rounded-lg border bg-card shadow-sm flex flex-col justify-between">
    <div>
      <div class="font-bold mb-2">Generated Recipe</div>

      <div v-if="loading" class="mt-3 flex space-x-1 items-center">
        <div class='h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div class='h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div class='h-2 w-2 bg-gray-400 rounded-full animate-bounce'></div>
      </div>

      <div v-else-if="isArray">
        <Accordion type="single" class="w-full" collapsible>
          <AccordionItem v-for="(recipe, index) in props.recipe" :key="index" :value="`item-${index}`">
            <AccordionTrigger>{{ recipe.name }}</AccordionTrigger>
            <AccordionContent>
              <RecipeDisplay :recipe="recipe" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div v-else-if="props.recipe">
        <RecipeDisplay :recipe="props.recipe" />
      </div>

      <div v-else-if="errorMessage" class="text-sm text-red-500 mt-4">
        {{ errorMessage }}
      </div>

      <div v-else class="text-sm text-muted-foreground mt-4">Generated recipe will appear here.</div>
    </div>

    <!-- Bottom Bar -->
    <div class="mt-4 flex justify-between items-center border-t pt-4">
      <!-- Feedback Section -->
      <div v-if="logId" class="flex items-center gap-4">
        <span class="text-xs text-muted-foreground">Was this helpful?</span>
        <Primitive
          as="button"
          class="flex items-center justify-center p-2 rounded-md transition"
          :class="[
            selectedFeedback === 'good' ? 'bg-green-100 text-green-600' : 'text-gray-500 hover:text-green-600'
          ]"
          :disabled="submittingFeedback"
          @click="toggleFeedback('good')"
        >
          <ThumbsUp class="w-4 h-4" />
        </Primitive>
        <Primitive
          as="button"
          class="flex items-center justify-center p-2 rounded-md transition"
          :class="[
            selectedFeedback === 'bad' ? 'bg-red-100 text-red-600' : 'text-gray-500 hover:text-red-600'
          ]"
          :disabled="submittingFeedback"
          @click="toggleFeedback('bad')"
        >
          <ThumbsDown class="w-4 h-4" />
        </Primitive>
      </div>

      <!-- Save Button -->
      <button
        v-if="props.recipe && !loading && !isArray"
        @click="emit('save-recipe')"
        class="text-sm font-medium underline underline-offset-4 hover:text-primary"
      >
        Save
      </button>
    </div>
  </div>
</template>
