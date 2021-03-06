import { Component, OnInit, ViewChild } from '@angular/core';
// ViewChild gives access to child DOM elements
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective;

  feedbackForm: FormGroup; // Form model that will host the reactive form
  feedback: Feedback; // data model for holding states
  contactType = ContactType;
  showFeedbackForm: Boolean = true;
  showProgressSpinner: Boolean = false;
  showReturnedFeedback: Boolean = false;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder,
    private feedbackservice: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    }); // this.fb.group() returns an instance of type FormGroup. Note the object passed in the param. It doesn't have to match the data model fully.
    
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {

    this.showFeedbackForm = false;
    this.showProgressSpinner = true;
    this.showReturnedFeedback = false;

    this.feedback = this.feedbackForm.value; // directly equating only because coincidently the structures match.
    this.feedbackservice.submitFeedback(this.feedback)
      .subscribe(feedback => {
        this.feedback = feedback;

        this.showFeedbackForm = false;
        this.showProgressSpinner = false;
        this.showReturnedFeedback = true;

        setTimeout(() => {
          this.feedback = null;

          this.showFeedbackForm = true;
          this.showProgressSpinner = false;
          this.showReturnedFeedback = false;

        }, 5000);
        console.log(feedback);
      },
      errmess => { 
        console.log(errmess);
        this.feedback = null;
        this.showFeedbackForm = true;
        this.showProgressSpinner = false;
        this.showReturnedFeedback = false;
      });
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

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}