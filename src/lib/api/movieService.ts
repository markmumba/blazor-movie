import { ApiResponse, Genre, Movie, MovieDetails, SearchParams } from "./types";


class MovieService {
    private readonly baseUrl = 'https://api.themoviedb.org/3';
    private readonly imageBaseUrl = 'https://image.tmdb.org/t/p/';
    private readonly accessToken: string;


    constructor() {
        this.accessToken = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN || '';

        if (!this.accessToken) {
            console.warn('TMDB Access Token not found. Please add NEXT_PUBLIC_TMDB_ACCESS_TOKEN to your environment variables.');
        }
    }
    private async makeRequest<T>(endpoint: string): Promise<T> {


        
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${this.accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json()
    }

    private buildQueryParams(params: Record<string, string | number | boolean | undefined> = {}): string {
        const queryParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                queryParams.append(key, value.toString());
            }

        });
        return queryParams.toString() ? `?${queryParams.toString()}` : '';

    }
    async getPopularMovies(page: number = 1): Promise<ApiResponse<Movie>> {
        const endpoint = `/movie/popular${this.buildQueryParams({ page })}`;
        try {
            return await this.makeRequest<ApiResponse<Movie>>(endpoint);
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            throw error;
        }

    }

    async getNowPlayingMovies(page: number = 1): Promise<ApiResponse<Movie>> {

        const endpoint = `/movie/now_playing${this.buildQueryParams({ page })}`;
        try {
            return await this.makeRequest<ApiResponse<Movie>>(endpoint)
        } catch (error) {
            console.error('Error fetching now playing movies:', error);
            throw error;
        }
    }

    async getTopRatedMovies(page: number = 1): Promise<ApiResponse<Movie>> {
        const endpoint = `/movie/top_rated${this.buildQueryParams({ page })}`;
        try {
            return await this.makeRequest<ApiResponse<Movie>>(endpoint);
        } catch (error) {
            console.error('Error fetching top rated movies:', error);
            throw error;
        }
    }

    async getUpcomingMovies(page: number = 1): Promise<ApiResponse<Movie>> {
        const endpoint = `/movie/upcoming${this.buildQueryParams({ page })}`;
        try {
            return await this.makeRequest<ApiResponse<Movie>>(endpoint);
        } catch (error) {
            console.error('Error fetching upcoming movies:', error);
            throw error;
        }
    }

    async searchMovies(params: SearchParams): Promise<ApiResponse<Movie>> {
        const { query, page = 1, year } = params;
        if (!query) {
            throw new Error('Search query is required');
        }
        const endpoint = `/search/movie${this.buildQueryParams({
            query,
            page,
            year,
            include_adult: false,
        })}`
        console.log(endpoint)
        try {
            return await this.makeRequest<ApiResponse<Movie>>(endpoint);
        } catch (error) {
            console.error('Error searching movies:', error);
            throw error;
        }
    }

    async getMovieDetails(movieId: number): Promise<MovieDetails> {
        const endpoint = `/movie/${movieId}${this.buildQueryParams({
            append_to_response: 'credits,videos'
        })}`;
        try {
            return await this.makeRequest<MovieDetails>(endpoint)
        } catch (error) {
            console.error('Error fetching movie details:', error);
            throw error;
        }
    }

    async getGenre(): Promise<{ genres: Genre[] }> {
        const endpoint = `/genre/movie/list`
        try {
            return await this.makeRequest<{ genres: Genre[] }>(endpoint)
        } catch (error) {
            console.error('Error fetching genres:', error);
            throw error;
        }
    }
    async getMoviesByGenre(genreId: string, page: number = 1): Promise<ApiResponse<Movie>> {
        const endpoint = `/discover/movie${this.buildQueryParams({
            with_genres: genreId,
            page,
            sort_by: 'popularity.desc',
            include_adult: false,
        })}`;
        try {
            return await this.makeRequest<ApiResponse<Movie>>(endpoint);
        } catch (error) {
            console.error('Error fetching movies by genre:', error);
            throw error;
        }
    }

    getImageUrl(imagePath: string | null, size: string = 'w500'): string {
        if (!imagePath) return '/placeholder-person.jpg';
        return `${this.imageBaseUrl}${size}${imagePath}`;
    }

    getPosterUrl(posterPath: string | null, size: 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string {
        return this.getImageUrl(posterPath, size);
    }

    getBackdropUrl(backdropPath: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string {
        return this.getImageUrl(backdropPath, size);
    }

    getProfileUrl(profilePath: string | null, size: 'w45' | 'w185' | 'h632' | 'original' = 'w185'): string {
        return this.getImageUrl(profilePath, size);
    }

}

export const movieService = new MovieService();
export default movieService;