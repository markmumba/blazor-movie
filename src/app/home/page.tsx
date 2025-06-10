'use client';
import movieService from "@/lib/api/movieService";
import { Movie } from "@/lib/api/types";
import { Play, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import Navigation from "../../components/custom-ui/shared/navigation";
import MovieSection from "@/components/custom-ui/home/moviesection";

function Homepage() {

    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                const [popularResponse, topRatedResponse, nowPlayingResponse] = await Promise.all([
                    movieService.getPopularMovies(),
                    movieService.getTopRatedMovies(),
                    movieService.getNowPlayingMovies(),
                ])
                setPopularMovies(popularResponse.results);
                setTopRatedMovies(topRatedResponse.results);
                setNowPlayingMovies(nowPlayingResponse.results);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred while fetching movies');
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();
    }, []);

    function LoadingSkeleton() {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="space-y-3">
                        <div className="aspect-[2/3] bg-muted animate-pulse rounded-lg" />
                        <div className="space-y-2">
                            <div className="h-4 bg-muted animate-pulse rounded" />
                            <div className="h-3 bg-muted animate-pulse rounded w-4/5" />
                            <div className="h-3 bg-muted animate-pulse rounded w-3/5" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Something went wrong</h2>
                    <p className="text-muted-foreground">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }


    return (
        <>
            <div className="min-h-screen bg-background">
                <Navigation />
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
                    {isLoading ? (
                        <div className="space-y-8">
                            <div>
                                <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
                                <LoadingSkeleton />
                            </div>
                            <div>
                                <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
                                <LoadingSkeleton />
                            </div>
                            <div>
                                <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
                                <LoadingSkeleton />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            <MovieSection
                                title="Popular Movies"
                                movies={popularMovies}
                                icon={<TrendingUp className="h-6 w-6 text-red-500" />}
                            />
                            <MovieSection
                                title="Top Rated"
                                movies={topRatedMovies}
                                icon={<Star className="h-6 w-6 text-yellow-500 fill-current" />}
                            />
                            <MovieSection
                                title="Now Playing"
                                movies={nowPlayingMovies}
                                icon={<Play className="h-6 w-6 text-green-500" />}
                            />
                        </div>
                    )}
                </main>
            </div>
        </>
    )
}

export default Homepage;