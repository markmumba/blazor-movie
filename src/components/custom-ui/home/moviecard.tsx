import movieService from "@/lib/api/movieService";
import { Movie } from "@/lib/api/types";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, Play, Star } from "lucide-react";
import Link from "next/link";


function MovieCard({ movie }: { movie: Movie }) {
    return (

        <Link href={`/movie/${movie.id}`}>
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
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10">
                            <Play className="h-4 w-4" />
                        </button>
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
        </Link>
    )
}

export default MovieCard;