import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-20">
      <div className="text-center px-4">
        <p className="text-6xl font-serif font-semibold text-primary/30 mb-4">
          404
        </p>
        <h1
          className="font-serif text-2xl sm:text-3xl font-semibold mb-3"
          data-testid="text-404-title"
        >
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>
        <Link href="/">
          <Button className="gap-2" data-testid="button-back-home">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
