import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators'; // Pipeable operators
import { HttpClient, HttpHeaders } from '@angular/common/http'; // HttpClient is an injectable service
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  invokeCount = 0;

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    console.log("Invoke count: ", this.invokeCount++);
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    console.log("Invoke count: ", this.invokeCount++);
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(tap(data => console.log('All :' + JSON.stringify(data))),
        catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    console.log("Invoke count: ", this.invokeCount++);
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]),
        catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    console.log("Invoke count: ", this.invokeCount++);
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)),
        tap(data => console.log('All :' + JSON.stringify(data))),
        catchError(error => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

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
Reactive Extensions represent data sequence as observable sequence, commonly called observable.
Observables can be considered as an array whose elements arrive asynchronously.
Methods can subscribe to observables and be asynchronously notified by new data arrival, end of data stream, and error.
Observable operators are methods on observables that make new observables. They don't buffer the data stream, rather operate (map, filter, take, merge) as data comes. PIPE() IS USED TO COMPOSE OPERATORS. IT ALSO RETURNS AN OBSERVABLE.

PROMISES:
- Provides a single future value
- Not Lazy (BY the time we are returned a promised, it is on its way to being resolved)
- Not cancellable (resolved or rejected only once)

OBSERVABLES:
- Emits multiple asynchronous values over time
- Lazy (they will not emit values until they are subscribed to)
- Cancellable (by unsubscribing)
- Supports map, filter reduce and similar operators

Right now, all our services are registered at the root, which means that single instances for entire application.
We have to option to register a service at different components, for having singletons available for specific component hierarchy.

*/
