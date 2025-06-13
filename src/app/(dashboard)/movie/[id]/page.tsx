'use client';
import MovieCard from "@/components/custom-ui/home/moviecard";
import CastCard from "@/components/custom-ui/movie/castcard";
import MovieLoadingSkeleton from "@/components/custom-ui/skeletons/movieskeleton";
import movieService from "@/lib/api/movieService";
import { Movie, MovieDetails } from "@/lib/api/types";
import { formatCurrency, formatDate, formatRuntime } from "@/lib/utils";
import { ArrowLeft, BookmarkPlus, Calendar, Clock, Globe, Heart, Play, Share2, Star } from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";

interface PageProps {
    params: Promise<{
        id: string;
    }>
}

function MovieDetailsPage({ params }: PageProps) {
    const { id } = use(params);

    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setIsLoading(true);
                const movieDetails = await movieService.getMovieDetails(Number(id));
                setMovie(movieDetails);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred while fetching movie details');
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovieDetails();
    }, [id]);

    useEffect(() => {
        if (!movie?.genres) return;

        const genre_ids = movie.genres.map((genre) => genre.id).join(',');
        if (!genre_ids) return;
        console.log(genre_ids);

        const stored = JSON.parse(localStorage.getItem('clickedGenres') || '[]');
        if (stored[stored.length - 1] !== genre_ids) {
            const updated = [...stored, genre_ids];
            localStorage.setItem('clickedGenres', JSON.stringify(updated));
        }

        const fetchMoviesByGenre = async () => {
            try {
                const movies = await movieService.getMoviesByGenre(genre_ids);
                setMovies(movies.results);
            } catch (error) {
                console.error('Error fetching movies by genre:', error);
            }
        }
        fetchMoviesByGenre();
    }, [movie?.genres]);

    if (isLoading) {
        return <MovieLoadingSkeleton />;
    }
    if (error || !movie) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Something went wrong</h2>
                    <p className="text-muted-foreground">{error || 'Movie not found'}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Go Back
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-background">
            <div className="relative">
                <div className="aspect-[16/9] overflow-hidden">
                    <Image
                        src={movieService.getImageUrl(movie.backdrop_path, 'w1280')}
                        alt={movie.title}
                        className="object-cover w-full h-full"
                        width={1000}
                        height={1000}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

                <div className="absolute top-4 left-4 z-20">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background/80 backdrop-blur hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 -mt-32 relative z-10 space-y-12 pb-12">
                <div className="grid md:grid-cols-[300px_1fr] gap-8">
                    <div className="mx-auto md:mx-0">
                        <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-2xl ring-1 ring-border">
                            <Image
                                src={movieService.getImageUrl(movie.poster_path, 'w500')}
                                alt={movie.title}
                                className="object-cover w-full h-full"
                                width={1000}
                                height={1000}
                            />
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold tracking-tight">{movie.title}</h1>
                            {movie.tagline && (
                                <p className="text-lg text-muted-foreground italic">&quot;{movie.tagline}&quot;</p>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-primary text-primary-foreground">
                                <Star className="w-4 h-4 fill-current mr-1" />
                                {movie.vote_average.toFixed(1)}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(movie.release_date)}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="w-4 h-4 mr-1" />
                                {formatRuntime(movie.runtime)}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-xl font-semibold">Overview</h2>
                            <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                                <Play className="h-4 w-4 mr-2" />
                                Watch Trailer
                            </button>
                            <button
                                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 relative duration-300 ${isAdded ? 'scale-110' : 'scale-100'}`}
                                onClick={() => {
                                    const stored = localStorage.getItem('watchlist');
                                    let watchlist: number[] = stored ? JSON.parse(stored) : [];
                                    const movieId = Number(id);
                                    if (!watchlist.includes(movieId)) {
                                        watchlist.push(movieId);
                                        localStorage.setItem('watchlist', JSON.stringify(watchlist));
                                    }
                                    setIsAdded(true);
                                    setTimeout(() => setIsAdded(false), 300);
                                }}
                            >
                                <BookmarkPlus className="h-4 w-4 mr-2" />
                                {isAdded ? "Added!" : "Add to Watchlist"}
                            </button>
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                                <Heart className="h-4 w-4" />
                            </button>
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                                <Share2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 pt-8 border-t">
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Movie Facts</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Status</span>
                                <span className="font-medium">{movie.status}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Budget</span>
                                <span className="font-medium">{formatCurrency(movie.budget)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Revenue</span>
                                <span className="font-medium">{formatCurrency(movie.revenue)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Language</span>
                                <span className="font-medium">
                                    {movie.spoken_languages.map(lang => lang.name).join(', ')}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Production</h2>
                        <div className="space-y-4">
                            {movie.production_companies.slice(0, 3).map((company) => (
                                <div key={company.id} className="flex items-center space-x-4 py-2 border-b">
                                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center ring-1 ring-border">
                                        {company.logo_path ? (
                                            <Image
                                                src={movieService.getImageUrl(company.logo_path, 'w92')}
                                                alt={company.name}
                                                className="w-8 h-8 object-contain"
                                                width={1000}
                                                height={1000}
                                            />
                                        ) : (
                                            <Globe className="w-5 h-5 text-muted-foreground" />
                                        )}
                                    </div>
                                    <span className="font-medium">{company.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {movie.credits?.cast && (
                    <div className="space-y-6 pt-8 border-t">
                        <h2 className="text-xl font-semibold">Cast</h2>
                        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
                            {movie.credits.cast.slice(0, 10).map((member) => (
                                <CastCard key={member.id} member={member} />
                            ))}
                        </div>
                    </div>
                )}

                {movie.credits?.crew && (
                    <div className="space-y-6 pt-8 border-t">
                        <h2 className="text-xl font-semibold">Key Crew</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {movie.credits.crew.slice(0, 8).map((member) => (
                                <div key={`${member.id}-${member.job}`} className="space-y-1">
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-sm text-muted-foreground">{member.job}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="space-y-6 pt-8 border-t">
                    <h2 className="text-xl font-semibold">Movies you might like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {movies.slice(0, 8).map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailsPage;