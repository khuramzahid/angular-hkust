import { Component } from '@angular/core';
import { title } from 'process';
import { table } from 'console';

@Component({
  selector: 'app-root',
  template: '<mat-toolbar color="primary"> <span>{{title}}</span> </mat-toolbar>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'conFusion';
}

/*
Component is the decorator applied to the class. 
It controls the selector through which we can refer to a component in the HTML document.
It also specifies templateUrl that is rendered when the component is to be mounted.
We can also have 'template' property instead of 'templateUrl' if the HTML code is small.
*/
