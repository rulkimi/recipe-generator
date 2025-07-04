import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <Card className="max-w-md w-full bg-muted/40 border border-border shadow-md">
        <CardContent className="flex flex-col items-center gap-6 p-8">
          <div className="flex items-center rounded-full justify-center w-20 h-20 bg-destructive/10 text-destructive shadow-inner">
            <AlertTriangle size={36} />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-primary">Page Not Found</h1>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
              Looks like this page doesn’t exist or has been moved. Maybe try going back?
            </p>
          </div>

          <Button asChild variant="secondary" className="mt-1 px-4 py-2 text-sm">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Go to Homepage
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
