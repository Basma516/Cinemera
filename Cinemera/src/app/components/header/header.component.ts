import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  watchlistCount = 0;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getWatchlist().subscribe((watchlist) => {
      this.watchlistCount = watchlist.length;
    });
  }


}
