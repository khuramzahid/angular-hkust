import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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
Variables defined here can be accessed in the template HTML through property binding.
Events on DOM can invoke methods defined here through event binding. 
*/
