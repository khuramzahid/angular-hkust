import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div>
                <mat-spinner></mat-spinner><h4>{{textToDisplay}}</h4>
             </div>`,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  textToDisplay: string = "Loading . . . Please Wait";
}
// Back ticks`` allow multiple strings
