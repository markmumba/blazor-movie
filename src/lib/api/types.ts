
export interface Movie {
    id: number;
    title: string;
    overview:string;
    poster_path:string;
    backdrop_path:string;
    release_date:string;
    vote_average:number;
    vote_count:number;
    genre_ids:number[];
    adult:boolean;
    original_language:string;
    original_title:string;
    popularity:number;
    video:boolean;
}

export interface MovieDetails extends Movie {
    genres:Genre[];
    runtime:number;
    budget:number;
    revenue:number;
    production_companies:ProductionCompany[];
    production_countries:ProductionCountry[];
    spoken_languages:SpokenLanguage[];
    status:string;
    tagline:string;
    credits?:{
        cast: CastMember[];
        crew:CrewMember[];
    };
}

export interface Genre {
    id:number;
    name:string;
}
export interface CastMember {
    id:number;
    name:string;
    character: string;
    profile_path:string |null;
    order:number;
}
export interface CrewMember {
    id:number;
    name:string;
    job:string;
    department:string;
    profile_path:string |null;
}


export interface ProductionCompany {
    id:number;
    name:string;
    logo_path:string |null;
    origin_country:string;
}
export interface ProductionCountry {  
    iso_3166_1:string;
    name:string;
}
export interface SpokenLanguage {
    iso_639_1:string;
    name:string;
}

export interface ApiResponse<T> {
    page:number;
    results:T[];
    total_pages:number;
    total_results:number;
}

export interface SearchParams {
    query?:string;
    page?:number;
    year?:number;
    genre?:string;
}


