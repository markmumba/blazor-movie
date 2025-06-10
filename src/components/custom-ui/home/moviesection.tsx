import { Movie } from "@/lib/api/types";
import MovieCard from "./moviecard";

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
    )
}


export default MovieSection;