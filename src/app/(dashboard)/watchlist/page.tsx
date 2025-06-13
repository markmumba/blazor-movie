"use client";
import { useEffect, useState } from "react";
import movieService from "@/lib/api/movieService";
import { Movie } from "@/lib/api/types";
import MovieSection from "@/components/custom-ui/home/moviesection";
import { BookmarkPlus } from "lucide-react";

const WatchlistPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWatchlistMovies = async () => {
            setIsLoading(true);
            const stored = localStorage.getItem("watchlist");
            if (!stored) {
                setMovies([]);
                setIsLoading(false);
                return;
            }
            const ids: number[] = JSON.parse(stored);
            if (ids.length === 0) {
                setMovies([]);
                setIsLoading(false);
                return;
            }
            // Fetch all movies in parallel
            const moviePromises = ids.map((id) => movieService.getMovieDetails(id));
            const results = await Promise.all(moviePromises);
            setMovies(results);
            setIsLoading(false);
        };
        fetchWatchlistMovies();
    }, []);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (movies.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center">
                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="text-2xl font-bold mb-2">Your Watchlist is Empty</h2>
                    <p className="text-muted-foreground">Add movies to your watchlist to see them here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
            <MovieSection title="Your Watchlist" movies={movies} icon={<BookmarkPlus />} />
        </div>
    );
};

export default WatchlistPage; 