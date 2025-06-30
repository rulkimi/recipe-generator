import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQueryState } from "nuqs";

const SEARCH_OPTIONS = [
  { label: 'Name', value: 'name' },
  { label: 'Ingredients', value: 'ingredients' },
]

export default function SearchType() {
  const [type, setType] = useQueryState('type');
  
  return (
    <RadioGroup
      className="grid grid-cols-3"
      defaultValue={type ?? "name"}
      onValueChange={setType}
    >
      {SEARCH_OPTIONS.map(option =>         
        <div className="flex items-center gap-3" key={option.value}>
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      )}
    </RadioGroup>
  );
}