'use client'
import { useEffect, useState,use } from "react";
import movieService from "@/lib/api/movieService";
import { Movie, Genre } from "@/lib/api/types";
import MovieCard from "@/components/custom-ui/home/moviecard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import GenreSkeleton from "@/components/custom-ui/skeletons/genreskeleton";

interface PageProps {
    params:Promise<{
        id: string;
    }>
}

export default function GenrePage({ params }: PageProps) {
    const { id } = use(params);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genreName, setGenreName] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            try {
                setIsLoading(true);
                const genresResponse = await movieService.getGenre();
                const genre = genresResponse.genres.find((g: Genre) => g.id === parseInt(id));
                if (genre) {
                    setGenreName(genre.name);
                }
                const response = await movieService.getMoviesByGenre(parseInt(id));
                setMovies(response.results);
            } catch (error) {
                console.error('Error fetching movies by genre:', error);
                setError(error instanceof Error ? error.message : 'An error occurred while fetching movies');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMoviesByGenre();
    }, [id]);

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
        );
    }

    if (isLoading) return <GenreSkeleton/>


    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/home"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">{genreName} Movies</h1>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}