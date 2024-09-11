import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlist: any[] = [];  // Store movies in the watchlist

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadWatchlist();  // Load the watchlist when the component initializes
  }

  // Load the watchlist from the MovieService
  loadWatchlist(): void {
    this.movieService.getWatchlist().subscribe((watchlist) => {
      this.watchlist = watchlist;  // Update the local watchlist
    });
  }

  // Remove a movie from the watchlist
  removeFromWatchlist(movie: any): void {
    this.movieService.removeFromWatchlist(movie);  // Remove the movie from the service
    // No need to call loadWatchlist again because the subscription will automatically update the watchlist
  }
}
