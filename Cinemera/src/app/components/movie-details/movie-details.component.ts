// src/app/components/movie-details/movie-details.component.ts

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { Movie } from '../../types/movie';
import { Pipe, PipeTransform } from '@angular/core';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule,TimeFormatPipe],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'], // Changed styleUrl to styleUrls
})
export class MovieDetailsComponent {
  movie: Movie | null = null; // Movie details
  recommendations: Movie[] = []; // Initialize recommendations to an empty array
  watchlist: Movie[] = []; // Current watchlist
  popularMovies: Movie[] = [];
  showPosterLoader: boolean = false;
  // Define the genre mapping
  genreMap: { [key: number]: string } = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10749: 'Romance',
    878: 'Science Fiction',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const movieId = +this.route.snapshot.paramMap.get('id')!;
    this.getMovieDetails(movieId);
    this.getRecommendations(movieId);
    this.loadWatchlist();
    this.loadPopularMovies();
  }

  loadPopularMovies(): void {
    this.movieService.getPopularMovies().subscribe(
      (data) => {
        this.popularMovies = data.results;
      },
      (error) => {
        console.error('Error fetching popular movies:', error);
      }
    );
  }
  // Fetch movie details
  getMovieDetails(id: number): void {
    this.movieService.getCinemeraMovieDetails(id).subscribe((data: Movie) => {
      this.movie = data;
      console.log('Movie details:', this.movie); // Log to check structure
      this.showPosterLoader = true;
      this.resizeImage(
        'https://image.tmdb.org/t/p/w500/' + this.movie.poster_path,
        500
      ).then((res) => {
        if (this.movie) {
          this.movie.poster_path = res;
        }
        this.showPosterLoader = false;
      });
      this.movie.production_companies.forEach((company) => {
        if (company.logo_path) {
          this.resizeImage(
            'https://image.tmdb.org/t/p/w500' + company.logo_path,
            28
          ).then((res) => {
            console.log(res);
            company.logo_path = res;
          });
        }
      });
    });
  }

  getStarRating(rating: number) {
    const fullStars = Math.floor(rating / 2); // Full stars (out of 5)
    const halfStar = rating % 2 >= 1 ? 1 : 0; // Check if there's a half-star
    const emptyStars = 5 - fullStars - halfStar; // Remaining stars are empty

    return { fullStars, halfStar, emptyStars };
  }

  // Fetch movie recommendations
  getRecommendations(movieId: number): void {
    this.movieService
      .getCinemeraRecommendations(movieId)
      .subscribe((data: { results: Movie[] }) => {
        this.recommendations = data.results;
      });
  }

  // Load watchlist
  loadWatchlist(): void {
    this.movieService.getWatchlist().subscribe((watchlist) => {
      this.watchlist = watchlist;
    });
  }

  // Add or remove movie from watchlist
  toggleWatchlist(movie: Movie): void {
    const isMovieInWatchlist = this.watchlist.some(
      (item) => item.id === movie.id
    );
    if (isMovieInWatchlist) {
      this.movieService.removeFromWatchlist(movie);
    } else {
      this.movieService.addToWatchlist(movie);
    }
    this.loadWatchlist(); // Reload watchlist after updating
  }

  // Check if the movie is already in the watchlist
  isInWatchlist(movieId: number): boolean {
    return this.watchlist.some((movie) => movie.id === movieId);
  }

  // Navigate back to movies list
  goBack(): void {
    this.router.navigate(['']); // Adjust the route to your movie list page
  }
  async resizeImage(url: string, height: number): Promise<string> {
    return new Promise((resolve, reject) => {
      // Create a new image element
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Handle CORS if needed

      img.onload = () => {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Calculate the new width to maintain the aspect ratio
        const aspectRatio = img.width / img.height;
        const width = height * aspectRatio;

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas content to data URL
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = url;
    });
  }
}