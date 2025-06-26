import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const LANGUAGE_OPTIONS = [
  { label: 'Malay', value: 'malay' },
  { label: 'English', value: 'english' },
]

export default function ResponseLanguage() {
  return (
    <RadioGroup className="grid grid-cols-2" defaultValue="malay">
      {LANGUAGE_OPTIONS.map(option =>         
        <div className="flex items-center gap-3" key={option.value}>
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      )}
    </RadioGroup>
  );
}