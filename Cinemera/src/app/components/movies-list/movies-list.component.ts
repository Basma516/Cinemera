import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'] // Corrected here
})

export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  searchQuery = ''; 
  watchlist: any[] = [];  

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.getMoviesByPage(this.currentPage);  // Load now playing movies on init
    this.loadWatchlist();  // Load the current watchlist
  }

  // Fetch paginated movies (Now Playing)
  getMoviesByPage(page: number): void {
    this.movieService.getPaginatedMovies(page).subscribe((data: any) => {
      this.movies = data.results;
    });
  }
  goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movies', movieId]);  // Ensure the route is correctly formed
  }
  
  // Search movies based on query
  searchMovies(): void {
    if (this.searchQuery.trim()) {
      // Navigate to search results page with the query
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    }
  }

  // Add or Remove movie from the watchlist
  toggleWatchlist(movie: any): void {
    const movieExists = this.watchlist.some((item) => item.id === movie.id);
    if (movieExists) {
      this.movieService.removeFromWatchlist(movie);  // Remove the movie from the watchlist
    } else {
      this.movieService.addToWatchlist(movie);  // Add the movie to the watchlist
    }
    this.loadWatchlist();  // Reload the watchlist after adding/removing
  }

  // Check if a movie is in the watchlist
  isInWatchlist(movieId: number): boolean {
    return this.watchlist.some((movie) => movie.id === movieId);
  }

  // Load watchlist from the service
  loadWatchlist(): void {
    this.movieService.getWatchlist().subscribe((watchlist) => {
      this.watchlist = watchlist;
    });
  }

  // Go to the next page
  nextPage(): void {
    this.currentPage++;
    this.getMoviesByPage(this.currentPage);
  }

  // Go to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getMoviesByPage(this.currentPage);
    }
  }
}
