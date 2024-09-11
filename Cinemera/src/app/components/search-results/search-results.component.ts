import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // To get query params
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchResults: any[] = [];
  searchQuery = '';  // To store the search query
  watchlist: any[] = [];  


  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    // Get the search query from URL query params
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      this.searchMovies(this.searchQuery);  // Fetch movies based on query
    });
  }

  // Function to fetch movies based on the search query
  searchMovies(query: string): void {
    if (query.trim()) {
      this.movieService.searchMovies(query).subscribe((data: any) => {
        this.searchResults = data.results;
      });
    }
  }


  // Add or Remove movie from the watchlist
  toggleWatchlist(movie: any): void {
    // Check if the movie already exists in the watchlist
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

  loadWatchlist(): void {
    this.movieService.getWatchlist().subscribe((watchlist) => {
      this.watchlist = watchlist;
    });
  }

}
