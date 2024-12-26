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
import useRecipeGenerator, { Recipe } from "@/hooks/useRecipeGenerator"

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
  const [complexity, setComplexity] = useState<number>(50)
  const [servings, setServings] = useState<number>(4)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [values, setValues] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe>();
  
  const handleGenerate = async () => {
    setIsGenerating(true)
    const { data, message, status } = await generateRecipe({}, { question })
    if (status == 'success') {
      console.log(message)
      console.log(data.recipe.name)
      setRecipe(data.recipe)
    }
    setIsGenerating(false)
  }
  
  return (
    <div className="flex flex-col gap-4">
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
              <Button className="gap-2" onClick={handleGenerate} disabled={isGenerating || !question}>
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

      {recipe && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{recipe.name}</h2>
            <section>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Ingredients</h3>
              <ul className="list-disc pl-6 space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li className="text-gray-800" key={index}>
                    <span className="font-semibold text-gray-900">{ingredient.name}, </span>
                    <span className="italic text-gray-600">{ingredient.amount}</span>
                  </li>
                ))}
              </ul>
            </section>
        
            <section className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Steps</h3>
              <ol className="list-decimal pl-6 space-y-4">
                {recipe.steps.map((step, index) => (
                  <li className="text-gray-800" key={index}>
                    <p className="block text-gray-900">{step.description}</p>
                    {step.tips && (
                      <p className="italic text-slate-500 mt-1">Tips: {step.tips}</p>
                    )}
                  </li>
                ))}
              </ol>
            </section>
        
            {recipe.suggested_pairings && (
              <section className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Suggested Pairings</h3>
                <ol className="pl-6 space-y-3">
                  {recipe.suggested_pairings.map((pairing, index) => (
                    <li className="list-decimal" key={index}>
                      <p className="block font-semibold text-gray-900">{pairing.dish_name}</p>
                      <p className="block italic text-slate-500">{pairing.description}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </CardContent>
        </Card>      
      )}
        
    </div>
  )
}

export default GenerateRecipe;
