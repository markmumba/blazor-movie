import React from 'react';

function HomeLoadingSkeleton() {
    function MovieCardSkeleton() {
        return (
            <div className="space-y-3">
                <div className="aspect-[2/3] bg-muted animate-pulse rounded-lg" />
                <div className="space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded" />
                    <div className="h-3 bg-muted animate-pulse rounded w-4/5" />
                    <div className="h-3 bg-muted animate-pulse rounded w-3/5" />
                </div>
            </div>
        );
    }

    function SectionSkeleton() {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-muted animate-pulse rounded" />
                    <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {[...Array(6)].map((_, index) => (
                        <MovieCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section Skeleton */}
            <section className="py-8 md:py-12 lg:py-16">
                <div className="container mx-auto max-w-7xl px-4 space-y-4 text-center">
                    <div className="h-12 sm:h-16 md:h-20 lg:h-24 bg-muted animate-pulse rounded mx-auto max-w-4xl" />
                    <div className="h-6 md:h-8 bg-muted animate-pulse rounded mx-auto max-w-2xl" />
                </div>
            </section>

            <main className="container mx-auto max-w-7xl px-4 space-y-12 pb-12">
                <div className="space-y-12">
                    <SectionSkeleton />

                    <SectionSkeleton />

                    <SectionSkeleton />
                </div>
            </main>
        </div>
    );
};

export default HomeLoadingSkeleton;