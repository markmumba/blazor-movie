import movieService from "@/lib/api/movieService";
import Home from "@/components/custom-ui/home/home";

export default  async function Homepage() {

    
    const [popularResponse, topRatedResponse, nowPlayingResponse] = await Promise.all([
        movieService.getPopularMovies(),
        movieService.getTopRatedMovies(),
        movieService.getNowPlayingMovies(),
    ]);


    return (
        <Home 
            popularMovies={popularResponse.results}
            topRatedMovies={topRatedResponse.results}
            nowPlayingMovies={nowPlayingResponse.results}
        />
    );
}
