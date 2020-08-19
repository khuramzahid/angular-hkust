import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DishService } from '../services/dish.service';
// GUARDS ARE INJECTABLE SERVICE
@Injectable({
  providedIn: 'root'
})
export class DishRouteGuardGuard implements CanActivate {
  dishIdArr: string[];

  constructor(private router: Router,
    private dishservice: DishService) { 
      // this.dishservice.getDishIds().subscribe(
      //   dishids => {
      //     this.dishIdArr = dishids;
      //   }
      // );
      this.dishIdArr = ["0", "1", "2", "3"];
    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // 'dishdetail' at index [0] and dishId at index [1] of url
    

    debugger;
    
    let id = next.url[1].path;

    if(this.dishIdArr.indexOf(id) == -1) {
      alert("Invalid Dish Id");
      this.router.navigate(['/menu']);
      return false;
    }
    
    return true;
  }
}
