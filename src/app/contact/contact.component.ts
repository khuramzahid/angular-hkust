import { Component, OnInit, ViewChild } from '@angular/core';
// ViewChild gives access to child DOM elements
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective;

  feedbackForm: FormGroup; // Form model that will host the reactive form
  feedback: Feedback; // data model for holding states
  contactType = ContactType;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      telnum: [0, Validators.required ],
      email: ['', Validators.required ],
      agree: false,
      contacttype: 'None',
      message: ''
    }); // this.fb.group() returns an instance of type FormGroup. Note the object passed in the param. It doesn't have to match the data model fully.
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value; // directly equating only because coincidently the structures match.
    console.log(this.feedbackForm.get('firstname').value);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}