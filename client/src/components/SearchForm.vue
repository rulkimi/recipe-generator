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
import { ref, watch } from 'vue'

const emit = defineEmits(['generate', 'update:question', 'update:language', 'change', 'search-by', 'upload-image'])
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
  { type: 'image', label: 'Image' }
]);
const ingredients = ref([]);
const fileInputRef = ref(null);
const file = ref(null);
const fileName = ref('');
const selectedLanguage = ref(props.language);

const updateValue = (event) => {
  emit('update:question', event.target.value)
}

const onChange = (event) => {
  emit('change', event.target.value)
}

const handleGenerate = () => {
  console.log('file value', file.value)
  if (searchType.value === 'ingredients') {
    emit('update:question', ingredients.value); // Emit ingredients value
  } else {
    emit('update:question', props.question);
  }
  emit('generate')
}

const searchBy = (mode) => {
  searchType.value = mode;
  emit('search-by', mode);
  if (mode === 'image') {
    fileInputRef.value.click();
  }
}

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = selectedFile; // Set the file
    fileName.value = selectedFile.name; // Set the file name
    emit('upload-image', file.value);
  } else {
    file.value = null; // Clear the file
    fileName.value = ''; // Clear the file name
  }
}

watch(selectedLanguage, (newVal) => {
  console.log(newVal)
  emit('update:language', newVal)
});
</script>

<template>
  <div class="rounded-lg text-card-foreground">
    <div class="w-full flex flex-col md:flex-row gap-2">
      <div
        class="flex-grow flex flex-col md:flex-row items-center border rounded-md bg-white gap-2"
        :class="{'!flex-col': searchType === 'ingredients' }"
      >
        <input
          v-if="searchType !== 'ingredients' && searchType !== 'image'"
          id="search-recipe"
          class="flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm placeholder:text-muted-foreground outline-none"
          placeholder="Search by"
          :value="props.question"
          @input="updateValue"
          @change="onChange"
          @keydown.enter="emit('generate')"
        />
        <TagsInput v-else-if="searchType === 'ingredients'" v-model="ingredients" class="border-none w-full">
          <TagsInputItem v-for="item in ingredients" :key="item" :value="item">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>

          <TagsInputInput class="placeholder:text-muted-foreground" placeholder="Search by ingredients" />
        </TagsInput>
        <div v-show="searchType === 'image'" class="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          <input 
            ref="fileInputRef" 
            type="file" 
            class="hidden"
            accept=".jpeg, .png, .jpg" 
            @change="handleFileChange"
          />
          <span class="text-muted-foreground text-sm text-start px-3 pt-2 py-3 block" @click="fileInputRef.click();">
            {{ fileName || 'Upload image' }}
          </span>
        </div>
        <div
          class="flex justify-end w-full gap-1 mr-2 mb-1"
          :class="{ 'md:mb-0' : searchType !== 'ingredients' }"
        >
          <button 
            v-for="button in typeButtons" 
            :key="button.type" 
            class="h-8 px-4 rounded-md hover:bg-slate-100 hover:border-white" 
            :class="searchType === button.type ? 'bg-slate-100' : 'border'" 
            @click="searchBy(button.type)"
          >
            {{ button.label }}
          </button>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row items-center gap-2" 
        :class="{'!flex-col': searchType === 'ingredients' }"
      >
        <div class="flex-grow w-full">
          <Select v-model="selectedLanguage">
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
        <div class="w-full md:w-auto" :class="{ 'md:!w-full' : searchType === 'ingredients' }">
          <Button 
            @click="handleGenerate"
            class="w-full md:w-auto"
            :class="{
              'animate-pulse cursor-not-allowed': loading,
              'md:!w-full': searchType === 'ingredients'
            }"
          >
            <span v-if="!loading">Generate</span>
            <span v-else>Generating...</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
