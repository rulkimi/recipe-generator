import { useDietaryRestrictions } from "@/app/recipes/dietary-restrictions-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DIETARY_OPTIONS } from "@/lib/constants";

export default function DietaryRestrictions() {
	const { dietaryRestrictions, setDietaryRestrictions } = useDietaryRestrictions();

	const handleCheckedChange = (checked: boolean, value: string) => {
		setDietaryRestrictions(prev => {
			let updated = [...prev];
			if (checked) {
				if (value === "halal") {
					updated = updated.filter(item => item !== "non-halal");
				} else if (value === "non-halal") {
					updated = updated.filter(item => item !== "halal");
				}
				updated.push(value);
			} else {
				updated = updated.filter(item => item !== value);
			}
			return updated;
		});
	};

	return (
		<div className="grid grid-cols-2 gap-2">
			{DIETARY_OPTIONS.map(option => {
				const isHalal = option.value === "halal";
				const isNonHalal = option.value === "non-halal";
				const halalSelected = dietaryRestrictions.includes("halal");
				const nonHalalSelected = dietaryRestrictions.includes("non-halal");

				const isDisabled =
					(isHalal && nonHalalSelected) || (isNonHalal && halalSelected);

				return (
					<div className="flex items-center gap-3" key={option.value}>
						<Checkbox
							id={option.value}
							checked={dietaryRestrictions.includes(option.value)}
							disabled={isDisabled}
							onCheckedChange={checked => {
								handleCheckedChange(checked === true, option.value);
							}}
						/>
						<Label htmlFor={option.value} className={isDisabled ? "opacity-50" : ""}>
							{option.label}
						</Label>
					</div>
				);
			})}
		</div>
	);
}
