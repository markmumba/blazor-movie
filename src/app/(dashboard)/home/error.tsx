'use client'; 

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Oops, something went wrong.</h2>
        <p className="text-muted-foreground">{error.message}</p>
        <button
          onClick={() => reset()}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
