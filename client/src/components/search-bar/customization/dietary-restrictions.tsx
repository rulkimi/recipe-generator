import { useDietaryRestrictions } from "@/app/recipes/dietary-restrictions-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const DIETARY_OPTIONS = [
	{ label: 'Halal', value: 'halal' },
	{ label: 'Vegan', value: 'vegan' },
	{ label: 'Vegetarion', value: 'vegetarian' },
	{ label: 'Non-dairy', value: 'non-dairy' },
] as const;

export default function DietaryRestrictions() {
	const { dietaryRestrictions, setDietaryRestrictions } = useDietaryRestrictions();

	const handleCheckedChange = (checked: boolean, value: string) => {
		setDietaryRestrictions(prev => {
			if (checked) {
				return [...prev, value];
			}
			return prev.filter(item => item !== value);
		});
	};

	return (
		<div className="grid grid-cols-2 gap-2">
			{DIETARY_OPTIONS.map(option => (
				<div className="flex items-center gap-3" key={option.value}>
					<Checkbox
						id={option.value}
						checked={dietaryRestrictions.includes(option.value)}
						onCheckedChange={checked => {
							handleCheckedChange(checked === true, option.value);
						}}
					/>
					<Label htmlFor={option.value}>{option.label}</Label>
				</div>
			))}
		</div>
	);
}