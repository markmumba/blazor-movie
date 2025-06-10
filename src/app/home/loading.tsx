import { Skeleton } from "@/components/ui/skeleton";

function MovieCardSkeleton() {
    return (
        <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="relative aspect-[2/3] overflow-hidden">
                <Skeleton className="w-full h-full" />
            </div>
            <div className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>
        </div>
    );
}

function MovieSectionSkeleton({ title }: { title: string }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-8 w-48" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <MovieCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}

export default function HomepageLoading() {
    return (
        <div className="min-h-screen bg-background">
            <section className="py-8 md:py-12 lg:py-16">
                <div className="container mx-auto max-w-7xl px-4 space-y-4 text-center">
                    <Skeleton className="h-12 w-3/4 mx-auto" />
                    <Skeleton className="h-6 w-2/3 mx-auto" />
                </div>
            </section>

            <main className="container mx-auto max-w-7xl px-4 space-y-12 pb-12">
                <MovieSectionSkeleton title="Popular Movies" />
                <MovieSectionSkeleton title="Top Rated" />
                <MovieSectionSkeleton title="Now Playing" />
            </main>
        </div>
    );
} 