import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

    @Input()
    dish: Dish; // The decorator specifies that the value for this variable will come in as prop.

  constructor() { }

  ngOnInit() {
  }

}
