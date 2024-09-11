import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './movies-list.component.html'
})
export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  currentPage = 1;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMoviesByPage(this.currentPage);
  }

  getMoviesByPage(page: number): void {
    this.movieService.getPaginatedMovies(page).subscribe((data: any) => {
      this.movies = data.results;
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.getMoviesByPage(this.currentPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getMoviesByPage(this.currentPage);
    }
  }


}