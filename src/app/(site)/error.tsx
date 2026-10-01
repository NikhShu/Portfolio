"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-danger/10 flex items-center justify-center">
          <span className="text-2xl text-danger">!</span>
        </div>
        <h2 className="text-2xl font-bold text-text mb-2">
          Something went wrong
        </h2>
        <p className="text-text-secondary mb-8">
          An unexpected error occurred. Please try again or refresh the page.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
