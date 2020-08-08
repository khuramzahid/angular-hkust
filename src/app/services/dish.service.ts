import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
  
  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => { 
      return dish.id; 
    }));
  }
}

/*
Injectable is the class decorator. In its arguments, it is specified that it is to be injected in the root element.
Service is the Model in M-V-VM design pattern.
A single instance of the service (singleton) is maintained by Angular's Built in Injector.

RxJS is an implementation of Reactive programming in JavaScript.
Reactive Programming is based mostly on the Observer Design Pattern and very less on the Iterative Design Pattern.
of() converts a dish object into a read stream.
pipe() is used to wait for that stream to form a chunk of data, and then dispatch after a 2 second delay.
*/
