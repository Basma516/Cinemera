import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'af26f0977fa2e1a5d13c417f16c0110d';
  private watchlist = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.loadWatchlistFromLocalStorage();
  }

  // Fetch now playing movies
  getCinemeraMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}`);
  }

  // Fetch movie details
  getCinemeraMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  // Fetch recommendations for a movie
  getCinemeraRecommendations(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}/recommendations?api_key=${this.apiKey}`);
  }

  // Search movies
  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}`);
  }

  // Fetch paginated movies (popular)
  getPaginatedMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`);
  }

  // Watchlist functions
  getWatchlist(): Observable<any[]> {
    return this.watchlist.asObservable();
  }

  addToWatchlist(movie: any): void {
    const currentWatchlist = this.watchlist.getValue();
    const updatedWatchlist = [...currentWatchlist, movie];
    this.watchlist.next(updatedWatchlist);
    this.saveWatchlistToLocalStorage(updatedWatchlist);
  }

  removeFromWatchlist(movie: any): void {
    const currentWatchlist = this.watchlist.getValue();
    const updatedWatchlist = currentWatchlist.filter(m => m.id !== movie.id);
    this.watchlist.next(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));  // Save to localStorage
  }

  // Load watchlist from localStorage
  private loadWatchlistFromLocalStorage(): void {
    const storedWatchlist = localStorage.getItem('watchlist');
    if (storedWatchlist) {
      this.watchlist.next(JSON.parse(storedWatchlist));
    }
  }

  // Save watchlist to localStorage
  private saveWatchlistToLocalStorage(watchlist: any[]): void {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }
}
