import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ROUTES } from './constants/app-routes';

const routes: Routes = [
  // { path: '', redirectTo: ROUTES.home, pathMatch: 'full' },
  { path: ROUTES.home, component: HomePageComponent },
  { path: ROUTES.about, component: AboutPageComponent },

  { path: '**', redirectTo: ROUTES.home },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
