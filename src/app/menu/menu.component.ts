import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  dishes: Dish[];

  selectedDish: Dish; // Not assigned by default
  // dishes: Dish[] = DISHES; // TypeScript assign same variable type (Array of Dish)

  // Here we are requiring the service which will be provided by the Angular's Dependency Injector.
  // Providers are registered at the app.module.ts
  constructor(private dishService: DishService) { }

  ngOnInit() {
    this.dishService.getDishes()
      .then(dishes => this.dishes = dishes);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}

/* 
In some sense, the ts file is like the View Model for the template HTML which can be considered as a View. 
Property and Event bindings can exist between the template HTML and the ts file. 
Service is the model. M-V-VM design pattern.
Service is a dependency for some components, but we may not choose to instantiate it in that component, rather have it injected in the instance of the component.
*/