import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function RecipeNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <Card className="max-w-md w-full bg-muted/40 border border-border shadow-md">
        <CardContent className="flex flex-col items-center gap-6 p-8">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 text-destructive shadow-inner">
            <AlertCircle size={36} />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-primary">Recipe Not Found</h1>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
              Oops! We couldn’t find the recipe you’re looking for. It might have been removed or doesn't exist.
            </p>
          </div>

          <Button asChild variant="secondary" className="mt-1 px-4 py-2 text-sm">
            <Link href="/recipes/search">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
