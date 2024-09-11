import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

 
  private apiUrl ='https://api.themoviedb.org/3';
  private apiKey = 'af26f0977fa2e1a5d13c417f16c0110d';
  private watchlist = new BehaviorSubject<any[]>([]); // Using BehaviorSubject to handle multiple subscribers

  constructor(private http: HttpClient) { }

  getCinemeraMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}`);
  }
  getCinemeraMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
  }
  getCinemeraRecommendations
  (movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}/recommendations?api_key=${this.apiKey}`);
  }
  
  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}`);
  }

  getPaginatedMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`);
  }
  // Watchlist functions
  getWatchlist(): Observable<any[]> {
    return this.watchlist.asObservable();
  }

  addToWatchlist(movie: any): void {
    const currentWatchlist = this.watchlist.getValue();
    this.watchlist.next([...currentWatchlist, movie]);
  }

  removeFromWatchlist(movie: any): void {
    const currentWatchlist = this.watchlist.getValue();
    this.watchlist.next(currentWatchlist.filter(m => m.id !== movie.id));
  }
}
