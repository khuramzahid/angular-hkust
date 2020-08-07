import { Component, OnInit } from '@angular/core';
//import {MatDialog, MatDialogRef} from '@angular/material'; // to make this component into a dialog component.
// In bootstrap, we have modal to have a component overlay on top of another component.
// Angular material provides dialog for modal like functionality.

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
