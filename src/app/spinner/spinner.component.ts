import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div>
                <mat-spinner></mat-spinner><h4>{{textToDisplay}}</h4>
             </div>`,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() textToDisplay: string = "Loading . . . Please Wait.";
}
// Back ticks`` allow multiple line of strings
