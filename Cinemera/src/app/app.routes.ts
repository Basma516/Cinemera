import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

export const routes: Routes = [
    {
        path: 'movie/:id',  
        component: MovieDetailsComponent,
      }
      
];
