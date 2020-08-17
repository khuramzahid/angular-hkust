import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div>
                <mat-spinner></mat-spinner><h4>{{textToDisplay}}</h4>
             </div>`,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() textToDisplay: string = "Loading . . . Please Wait.";
  @Output() notifyVar: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.notifyVar.emit(this.textToDisplay);
  }
}
// Back ticks`` allow multiple line of strings
