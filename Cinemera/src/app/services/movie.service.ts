import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

 
  private apiUrl ='https://api.themoviedb.org/3';
  private apiKey = 'af26f0977fa2e1a5d13c417f16c0110d';

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
}
