import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-warning/10 flex items-center justify-center">
          <span className="text-2xl text-warning">404</span>
        </div>
        <h2 className="text-2xl font-bold text-text mb-2">Page not found</h2>
        <p className="text-text-secondary mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
