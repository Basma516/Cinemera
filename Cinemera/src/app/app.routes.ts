import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
      
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';


export const routes: Routes = [
  

    {
        path: '',
        component: MoviesListComponent,
        title: 'Movies List',
      }
    ,
    {
        path: 'movies/:id',  
        component: MovieDetailsComponent,
      },


    {path: 'search',
        component: SearchResultsComponent,
       title: 'Search Results',
   },
   {
       path: 'watchlist',
        component: WatchlistComponent,
        title: 'Watchlist',
   },
   { path: '**', redirectTo: '' }  // Wildcard route
];
