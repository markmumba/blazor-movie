export default function MovieLoadingSkeleton() {
    return (
    <div className="min-h-screen bg-background">
        <div className="relative">
            <div className="aspect-[16/9] bg-muted animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="container -mt-32 relative z-10 space-y-8">
            <div className="grid md:grid-cols-[300px_1fr] gap-8">
                <div className="aspect-[2/3] bg-muted animate-pulse rounded-lg" />
                <div className="space-y-4">
                    <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                    <div className="space-y-2">
                        <div className="h-4 bg-muted animate-pulse rounded" />
                        <div className="h-4 bg-muted animate-pulse rounded" />
                        <div className="h-4 bg-muted animate-pulse rounded w-4/5" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
