import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
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
