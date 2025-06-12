import movieService from "@/lib/api/movieService";
import { Movie } from "@/lib/api/types";
import { formatYear } from "@/lib/utils";
import { Clock, Link as LinkIcon, Search, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function SearchComponent({ className }: { className?: string }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('recent-movie-searches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.trim().length >= 2) {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
            debounceRef.current = setTimeout(async () => {
                try {
                    setIsLoading(true);
                    const response = await movieService.searchMovies({ query: query.trim() });
                    setResults(response.results.slice(0, 8));
                    setIsOpen(true);
                } catch (error) {
                    setResults([]);
                } finally {
                    setIsLoading(false);
                }
            }, 500);
        } else {
            setResults([]);
            if (query.trim().length === 0) {
                setIsOpen(false);
            }
        }

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        }
    }, [query]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        console.log('Input changed:', value);
        setQuery(value);

        if (value.trim().length > 0) {
            setIsOpen(true);
        }
    }

    const handleSelectMovie = (movie: Movie) => {
        const newRecentSearches = [movie.title, ...recentSearches.filter(s => s !== movie.title)].slice(0, 5);
        setRecentSearches(newRecentSearches)
        localStorage.setItem('recent-movie-searches', JSON.stringify(newRecentSearches));

        setQuery('');
        setIsOpen(false);
        setResults([]);
    }

    const handleRecentSearch = (searchTerm: string) => {
        setQuery(searchTerm);
        inputRef.current?.focus();
    }

    const clearRecentSearches = () => {
        console.log('Clearing recent searches');
        setRecentSearches([]);
        localStorage.removeItem('recent-movie-searches');
    };
    return (
        <>
            <div ref={searchRef} className={`relative ${className}`}>
                {/* Search Input */}
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="search"
                        placeholder="Search movies..."
                        value={query}
                        onChange={handleInputChange}
                        onFocus={() => {
                            if (query.trim().length >= 2 || recentSearches.length > 0) {
                                setIsOpen(true);
                            }
                        }}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 pr-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                        {isLoading ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                        ) : (
                            <Search className="h-4 w-4 text-muted-foreground" />
                        )}
                    </div>
                </div>

                {/* Search Dropdown */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                        {/* Search Results */}
                        {query.trim().length >= 2 && (
                            <div className="p-2">
                                {results.length > 0 ? (
                                    <>
                                        <div className="text-xs text-muted-foreground mb-2 px-2">
                                            Search results for "{query}"
                                        </div>
                                        {results.map((movie) => (
                                            <Link
                                                key={movie.id}
                                                href={`/movie/${movie.id}`}
                                                onClick={() => handleSelectMovie(movie)}
                                                className="flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors"
                                            >
                                                <img
                                                    src={movieService.getImageUrl(movie.poster_path)}
                                                    alt={movie.title}
                                                    className="w-8 h-12 object-cover rounded flex-shrink-0"
                                                    onError={(e) => {
                                                        e.currentTarget.src = '/placeholder-movie.jpg';
                                                    }}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-sm truncate">{movie.title}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {formatYear(movie.release_date)} • ⭐ {movie.vote_average.toFixed(1)}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </>
                                ) : !isLoading && (
                                    <div className="p-4 text-center text-muted-foreground text-sm">
                                        No movies found for "{query}"
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Recent Searches */}
                        {query.trim().length < 2 && recentSearches.length > 0 && (
                            <div className="p-2 border-t">
                                <div className="flex items-center justify-between mb-2 px-2">
                                    <div className="text-xs text-muted-foreground flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        Recent searches
                                    </div>
                                    <button
                                        onClick={clearRecentSearches}
                                        className="text-xs text-muted-foreground hover:text-foreground"
                                    >
                                        Clear
                                    </button>
                                </div>
                                {recentSearches.map((search, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleRecentSearch(search)}
                                        className="flex items-center gap-2 w-full p-2 hover:bg-accent rounded-md transition-colors text-left"
                                    >
                                        <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                        <span className="text-sm truncate">{search}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Trending Suggestions */}
                        {query.trim().length < 2 && recentSearches.length === 0 && (
                            <div className="p-4 text-center">
                                <div className="text-xs text-muted-foreground flex items-center justify-center mb-2">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Try searching for popular movies
                                </div>
                                <div className="flex flex-wrap gap-1 justify-center">
                                    {['Batman', 'Marvel', 'Star Wars', 'Horror'].map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            onClick={() => handleRecentSearch(suggestion)}
                                            className="text-xs px-2 py-1 bg-muted hover:bg-accent rounded-full transition-colors"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </>
    )
}

export default SearchComponent;