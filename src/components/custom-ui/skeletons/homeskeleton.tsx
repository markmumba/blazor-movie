import React from 'react';
import { Play, Star, TrendingUp } from 'lucide-react';

function HomeLoadingSkeleton() {
    function SectionSkeleton({ title, icon }: { title: string, icon: React.ReactNode }) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    {icon}
                    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-lg aspect-[2/3] bg-muted"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.2s_infinite]"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <section className="py-8 md:py-12 lg:py-16">
                <div className="container mx-auto max-w-7xl px-4 space-y-4 text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                        Discover Amazing Movies
                    </h1>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        Explore thousands of movies, get personalized recommendations, and never wonder what to watch next.
                    </p>
                </div>
            </section>

            <main className="container mx-auto max-w-7xl px-4 space-y-12 pb-12">
                <div className="space-y-12">
                    <SectionSkeleton
                        title="Popular Movies"
                        icon={<TrendingUp className="h-6 w-6 text-red-500" />}
                    />
                    <SectionSkeleton
                        title="Top Rated"
                        icon={<Star className="h-6 w-6 text-yellow-500 fill-current" />}
                    />
                    <SectionSkeleton
                        title="Now Playing"
                        icon={<Play className="h-6 w-6 text-green-500" />}
                    />
                </div>
            </main>
        </div>
    );
}

export default HomeLoadingSkeleton;
