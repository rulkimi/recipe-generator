import { Loader } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[40vh]">
			<Loader className="animate-spin size-8 text-muted-foreground mb-4" />
			<span className="text-muted-foreground text-lg">Loading...</span>
		</div>
	);
}