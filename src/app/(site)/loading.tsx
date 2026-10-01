export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-border" />
          <div className="absolute inset-0 rounded-full border-2 border-t-primary border-transparent animate-spin" />
        </div>
        <p className="text-sm text-text-secondary font-medium">Loading...</p>
      </div>
    </div>
  );
}
