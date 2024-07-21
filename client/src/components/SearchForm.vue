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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const emit = defineEmits(['generate', 'update:question', 'update:language', 'change'])
const props = defineProps({
  question: {
    type: String,
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

const updateValue = (event) => {
  emit('update:question', event.target.value)
}

const onChange = (event) => {
  emit('change', event.target.value)
}

const handleGenerate = () => {
  emit('generate')
}

const updateLanguage = (value) => {
  emit('update:language', value)
}
</script>

<template>
  <div class="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
    <div class="w-full flex gap-2">
      <div class="flex-grow">
        <input
          id="search-recipe"
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search for a recipe"
          :value="props.question"
          @input="updateValue($event)"
          @change="onChange($event)"
        />
      </div>
      <div class="flex items-center gap-2">
        <div class="flex-grow">
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
        <div>
          <Button 
            @click="handleGenerate"
            :class="{'animate-pulse cursor-not-allowed': loading}"
          >
            <span v-if="!loading">Generate</span>
            <span v-else>Generating...</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

