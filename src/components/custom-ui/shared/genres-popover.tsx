import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import movieService from "@/lib/api/movieService";
import { Genre } from "@/lib/api/types";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function GenresPopover() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await movieService.getGenre();
                setGenres(response.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGenres();
    }, []);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                    Genres
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
                {isLoading ? (
                    <div className="flex items-center justify-center py-4">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-2">
                        {genres.map((genre) => (
                            <Link
                                key={genre.id}
                                href={`/genre/${genre.id}`}
                                className="px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
} 