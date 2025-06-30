
'use client';
import { Movie } from "@/lib/api/types";
import { Play, Star, TrendingUp, ThumbsUp } from "lucide-react";
import MovieSection from "@/components/custom-ui/home/moviesection";
import { useEffect, useState } from "react";
import { getMostFrequentGenre } from "@/lib/utils";
import movieService from "@/lib/api/movieService";

function Home({
    popularMovies,
    topRatedMovies,
    nowPlayingMovies,
}:{
    popularMovies:Movie[];
    topRatedMovies:Movie[];
    nowPlayingMovies:Movie[];
}) {
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
    useEffect(() => {
        const fetchRecommendedMovies = async () => {
                const recommendedGenre = getMostFrequentGenre(3);
                if (recommendedGenre) {
                    const recommendedResponse = await movieService.getMoviesByGenre(recommendedGenre)
                    setRecommendedMovies(recommendedResponse.results)
                }
        }
        fetchRecommendedMovies();
    })
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

            <div className="container mx-auto max-w-7xl px-4 py-8 space-y-12">
                {recommendedMovies.length > 0 ? (
                    <MovieSection
                        title="Recommended for You"
                        movies={recommendedMovies}
                        icon={<ThumbsUp className="w-6 h-6" />}
                    />
                ) : (
                    <div className="text-muted-foreground text-center bg-gray-200 p-4 rounded-lg tracking-tight">
                        <div className="text-2xl font-bold tracking-tight">
                            This is where you will see movies based on your taste.
                        </div>
                        <div className="text-sm">
                            Once you have clicked enough movies, we will recommend you movies based on your taste.
                        </div>
                    </div>
                )}
                <MovieSection
                    title="Popular Movies"
                    movies={popularMovies}
                    icon={<TrendingUp className="w-6 h-6" />}
                />
                <MovieSection
                    title="Top Rated"
                    movies={topRatedMovies}
                    icon={<Star className="w-6 h-6" />}
                />
                <MovieSection
                    title="Now Playing"
                    movies={nowPlayingMovies}
                    icon={<Play className="w-6 h-6" />}
                />
            </div>
        </div>
    );
}

export default Home;