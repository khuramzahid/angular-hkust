import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut } from '../animations/app.animation';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class MenuComponent implements OnInit {
  
  dishes: Dish[];
  errMess: string;

  // dishes: Dish[] = DISHES; // TypeScript assign same variable type (Array of Dish)

  // Here we are requiring the service which will be provided by the Angular's Dependency Injector.
  // Providers are registered at the app.module.ts
  constructor(private dishService: DishService,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }
  
}

/* 
In some sense, the ts file is like the View Model for the template HTML which can be considered as a View. 
Property and Event bindings can exist between the template HTML and the ts file. 
Service is the model. M-V-VM design pattern.
Service is a dependency for some components, but we may not choose to instantiate it in that component, rather have it injected in the instance of the component.
*/