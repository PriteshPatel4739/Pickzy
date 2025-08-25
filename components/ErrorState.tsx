'use client';

export default function ErrorState({ onRetry, message = 'Something went wrong.' }: { onRetry: () => void; message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border p-8 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
      <button onClick={onRetry} className="rounded-md border px-3 py-2 text-sm hover:bg-accent">
        Try again
      </button>
    </div>
  );
}
