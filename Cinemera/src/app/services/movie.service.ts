import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { Observable } from 'rxjs';
import { Movie } from '../types/movie'; 
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl ='https://api.themoviedb.org/3';
  private apiKey = 'af26f0977fa2e1a5d13c417f16c0110d';
  private watchlist = new BehaviorSubject<Movie[]>([]); // Using BehaviorSubject to handle multiple subscribers

  constructor(private http: HttpClient) { }

  getCinemeraMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}`);
  }

  getCinemeraMovieDetails(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  getCinemeraRecommendations(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/${movieId}/recommendations?api_key=${this.apiKey}`);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}`);
  }

  getPaginatedMovies(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`);
  }

  // Watchlist functions
  getWatchlist(): Observable<Movie[]> {
    return this.watchlist.asObservable();
  }

  addToWatchlist(movie: Movie): void {
    const currentWatchlist = this.watchlist.getValue();
    this.watchlist.next([...currentWatchlist, movie]);
  }

  removeFromWatchlist(movie: Movie): void {
    const currentWatchlist = this.watchlist.getValue();
    this.watchlist.next(currentWatchlist.filter(m => m.id !== movie.id));
  }

  getPopularMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}`);
  }
  
}
