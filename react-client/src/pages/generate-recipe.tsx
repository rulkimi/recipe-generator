import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Camera, Share2, Loader2, Sparkles } from "lucide-react"
import { InputTags } from "@/components/ui/input-tags"
import useRecipeGenerator from "@/hooks/useRecipeGenerator"

const { generateRecipe } = useRecipeGenerator();

interface DietaryRestriction {
  id: string;
  label: string;
}

const dietaryRestrictions: DietaryRestriction[] = [
  { id: "halal", label: "Halal" },
  { id: "vegan", label: "Vegan" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "non-dairy", label: "Non-dairy" }
];

const GenerateRecipe = () => {
  // Use TypeScript's type annotations
  const [complexity, setComplexity] = useState<number>(50)
  const [servings, setServings] = useState<number>(4)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [values, setValues] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>('');
  
  const handleGenerate = async () => {
    setIsGenerating(true)
    const { data, message, status } = await generateRecipe({}, { question })
    if (status == 'success') {
      console.log(message)
      console.log(data.recipe.name)
    }
    setIsGenerating(false)
  }
  
  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="name" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="name">Name</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
          </TabsList>
          <TabsContent value="name" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Recipe Name or Type</Label>
              <Input
                id="name" 
                placeholder="E.g., Chocolate Cake, Italian Pasta..." 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                autoComplete="on"
              />
            </div>
          </TabsContent>
          <TabsContent value="ingredients" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="ingredients">List of Ingredients</Label>
              <InputTags
                id="ingredients"
                value={values}
                onChange={setValues}
                placeholder="Enter values, comma separated..."
                className="max-w-[500px]"
              />
            </div>
          </TabsContent>
          <TabsContent value="image" className="space-y-4">
            <div className="grid gap-4">
              <Label htmlFor="image">Upload or Provide Image URL</Label>
              <div className="grid gap-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Camera className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop an image, or click to browse
                  </p>
                </div>
                <Input id="image" placeholder="Or paste an image URL..." />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-sm font-medium">Dietary Restrictions</h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {dietaryRestrictions.map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox id={id} />
                  <Label htmlFor={id}>{label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label asSpan>Recipe Complexity</Label>
                <span className="text-sm text-muted-foreground">{complexity}%</span>
              </div>
              <Slider
                id="complexity-slider"
                value={[complexity]}
                onValueChange={([value]) => setComplexity(value)}
                max={100}
                step={1}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label asSpan>Number of Servings</Label>
                <span className="text-sm text-muted-foreground">{servings} people</span>
              </div>
              <Slider
                value={[servings]}
                onValueChange={([value]) => setServings(value)}
                max={12}
                step={1}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button className="gap-2" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Generate Recipe
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default GenerateRecipe;
