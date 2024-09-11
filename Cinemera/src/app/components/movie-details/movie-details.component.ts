import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  movie: any;              // Movie details
  recommendations: any[] = [];   // Initialize recommendations to an empty array
  watchlist: any[] = [];    // Current watchlist
  
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
  }

  // Fetch movie details
  getMovieDetails(id: number): void {
    this.movieService.getCinemeraMovieDetails(id).subscribe((data: any) => {
      this.movie = data;
    });
  }

  // Fetch movie recommendations
  getRecommendations(movieId: number): void {
    this.movieService.getCinemeraRecommendations(movieId).subscribe((data: any) => {
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
  toggleWatchlist(movie: any): void {
    const isMovieInWatchlist = this.watchlist.some((item) => item.id === movie.id);
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
    this.router.navigate(['/movies']);  // Adjust the route to your movie list page
  }
}
