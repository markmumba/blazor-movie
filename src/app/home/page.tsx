import movieService from "@/lib/api/movieService";
import { Movie } from "@/lib/api/types";
import { BookmarkPlus, Calendar, Clock, Play, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

async function getMovies() {
    try {
        const [popularResponse, topRatedResponse, nowPlayingResponse] = await Promise.all([
            movieService.getPopularMovies(),
            movieService.getTopRatedMovies(),
            movieService.getNowPlayingMovies(),
        ]);
        return {
            popularMovies: popularResponse.results,
            topRatedMovies: topRatedResponse.results,
            nowPlayingMovies: nowPlayingResponse.results,
        };
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[2/3] overflow-hidden">
                <img
                    src={movieService.getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.src = '/placeholder-movie.jpg';
                    }}
                />

                <div className="absolute top-2 right-2">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-black/80 text-white">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {movie.vote_average.toFixed(1)}
                    </div>
                </div>

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={`/movie/${movie.id}`}>
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10">
                            <Play className="h-4 w-4" />
                        </button>
                    </Link>
                </div>
            </div>

            <div className="p-4 space-y-2">
                <h3 className="font-semibold leading-none tracking-tight line-clamp-1">
                    {movie.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {movie.overview}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                    <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(movie.release_date)}
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {movie.vote_count.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MovieSection({ title, movies, icon }: { title: string, movies: Movie[], icon: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                {icon}
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default async function Homepage() {
    const { popularMovies, topRatedMovies, nowPlayingMovies } = await getMovies();

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
            </main>
        </div>
    );
} 