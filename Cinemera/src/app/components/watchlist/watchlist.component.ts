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

  // Check if a movie is in the watchlist
  isInWatchlist(movie: any): boolean {
    return this.watchlist.some((m) => m.id === movie.id);
  }

  // Toggle movie in/out of watchlist
  toggleWatchlist(movie: any): void {
    if (this.isInWatchlist(movie)) {
      this.movieService.removeFromWatchlist(movie);  // Remove the movie if it's already in the watchlist
    } else {
      this.movieService.addToWatchlist(movie);  // Add the movie to the watchlist
    }
  }

  // Convert the rating to stars
  getStars(rating: number): string[] {
    const maxStars = 5;
    const filledStars = Math.floor(rating / 2);  
    const halfStar = (rating % 2) >= 1 ? 1 : 0;
    const emptyStars = maxStars - filledStars - halfStar;

   
    return [
      ...Array(filledStars).fill('fa-solid fa-star'),
      ...Array(halfStar).fill('fa-solid fa-star-half-alt'),
      ...Array(emptyStars).fill('fa-regular fa-star')
    ];
  }
}
