import { Routes } from '@angular/router';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';



export const routes: Routes = [
    {
        path: '',
        component: MoviesListComponent,
        title: 'Movies List',
      }
    ,{path: 'search',
        component: SearchResultsComponent,
       title: 'Search Results',
   },
   {
       path: 'watchlist',
        component: WatchlistComponent,
        title: 'Watchlist',
   }
];
