
export interface Genre {
    id: number;
    name: string;
  }
  
  export interface ProductionCompany {
    id: number;
    logo_path: string ; 
    name: string;
    origin_country: string;
  }
  
  export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
  }
  
  export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
  }
  
  export interface Movie {
    adult: boolean;
    backdrop_path: string | null; // Can be null if not available
    belongs_to_collection?: {
      backdrop_path: string | null;
      id: number;
      name: string;
      poster_path: string | null;
    };
    budget: number;
    genres: Genre[];
    homepage: string | null; // Can be null if not available
    id: number;
    imdb_id: string | null; // Can be null if not available
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null; // Can be null if not available
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string; // Date as a string
    revenue: number;
    runtime: number; // Runtime in minutes
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string | null; // Can be null if not available
    title: string;
    video: boolean;
    vote_average: number; // Average rating
    vote_count: number; // Total votes
  }