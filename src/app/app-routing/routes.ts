import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { Four0fourComponent } from '../four0four/four0four.component';
import { DishRouteGuardGuard } from '../dishdetail/dish-route-guard.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'contactus', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dishdetail/:id', canActivate: [ DishRouteGuardGuard ], component: DishdetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Four0fourComponent}
];

// Imported by app-routing module
// routerLink attribute directive provided in header template HTML