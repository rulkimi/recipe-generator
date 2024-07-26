<script setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/components/ui/tags-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'

const emit = defineEmits(['generate', 'update:question', 'update:language', 'change', 'search-by'])
const props = defineProps({
  question: {
    type: [String, Array],
    required: true,
  },
  language: {
    type: String,
    default: 'malay',
  },
  loading: {
    type: Boolean,
    required: true
  }
})

const searchType = ref('name');
const typeButtons = ref([
  { type: 'name', label: 'Name' },
  { type: 'ingredients', label: 'Ingredients' },
  // { type: 'image', label: 'Image' }
]);
const ingredients = ref([]);

const updateValue = (event) => {
  emit('update:question', event.target.value)
}

const onChange = (event) => {
  emit('change', event.target.value)
}

const handleGenerate = () => {
  if (searchType.value === 'ingredients') {
    emit('update:question', ingredients.value); // Emit ingredients value
  } else {
    emit('update:question', props.question);
  }
  emit('generate')
}

const updateLanguage = (value) => {
  emit('update:language', value)
}

const searchBy = (mode) => {
  searchType.value = mode;
  emit('search-by', mode);
}
</script>

<template>
  <div class="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
    <div class="w-full flex gap-2">
      <div class="flex-grow flex items-center border rounded-md bg-white gap-2" :class="{ 'flex-col' : searchType === 'ingredients'}">
        <input
          v-if="searchType !== 'ingredients'"
          id="search-recipe"
          class="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search by"
          :value="props.question"
          @input="updateValue"
          @change="onChange"
        />
        <TagsInput v-else v-model="ingredients" class="border-none w-full">
          <TagsInputItem v-for="item in ingredients" :key="item" :value="item">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>

          <TagsInputInput placeholder="Search by ingredients" />
        </TagsInput>
        <div class="flex justify-end w-full gap-1 mr-2" :class="{ 'mb-1' : searchType === 'ingredients'}">
          <button 
            v-for="button in typeButtons" 
            :key="button.type" 
            class="h-8 px-4 rounded-md" 
            :class="searchType === button.type ? 'bg-gray-100' : 'border'" 
            @click="searchBy(button.type)"
          >
            {{ button.label }}
          </button>
        </div>
      </div>
      <div class="flex items-center gap-2" :class="{ 'flex-col' : searchType === 'ingredients'}">
        <div class="flex-grow" :class="{ 'w-full' : searchType === 'ingredients'}">
          <Select :defaultValue="props.language" @value-change="updateLanguage">
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                <SelectItem value="malay">
                  Bahasa Melayu
                </SelectItem>
                <SelectItem value="english">
                  English
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div :class="{ 'w-full' : searchType === 'ingredients'}">
          <Button 
            @click="handleGenerate"
            :class="{'animate-pulse cursor-not-allowed': loading,'w-full' : searchType === 'ingredients' }"
          >
            <span v-if="!loading">Generate</span>
            <span v-else>Generating...</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
