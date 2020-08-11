import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { visibility } from '../animations/app.animation';

/*

void state: element is not attached to a view.
"*" any state: wildcard
Animations are applied to transitions of states.
void => * is equivalent to :enter, meaning it has entered the view.
* => void is equivalent to :leave, meaning it has left the view.


*/
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    visibility()
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishcopy: Dish;
  errMess: string;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  commentDS: Comment;
  BaseURL: string;
  visibility = 'shown';

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Author is required.',
      'minlength':     'Author must be at least 2 characters long.',
    },
    'comment': {
      'required':      'Comment is required.'
    }
  };

  @ViewChild('cform') commentFormDirective; // to reset the form completely

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private baseURL) {
      this.createForm();
    }
  
  createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required ],
      author: ['', [Validators.required, Validators.minLength(2)] ],
      date: ''
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));    // valueChanges is a prebuilt observable service

    this.onValueChanged(); // (re)set validation messages now
  } 

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
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

  onSubmit() {
    this.commentDS = this.commentForm.value;
    this.commentDS.date = new Date().toISOString()
    console.log(this.commentDS);
    this.dishcopy.comments.push(this.commentDS);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; 
        this.dishcopy = dish;
      },
      errmess => { 
        this.dish = null; 
        this.dishcopy = null; 
        this.errMess = <any>errmess; 
      });

    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: '',
      date: ''
    });
    this.commentFormDirective.resetForm(); // to reset the form completely
  }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
        errmess => this.errMess = <any>errmess );
    this.route.params
      .pipe(switchMap((params: Params) => { 
        this.visibility = 'hidden'; // Hiding the current shown dish.
        return this.dishservice.getDish(+params['id']); 
      }))
      .subscribe(dish => { 
        this.dish = dish; 
        this.dishcopy = dish; 
        this.setPrevNext(dish.id); 
        this.visibility = 'shown'; // Showing the newly received dish from the service.
      },errmess => this.errMess = <any>errmess);
    // method chaining is achieved when all functions use "return this;" at the end.
    // switchMap is used here to replace the params observable value with the value from another observable getDish
    // params is an array which means it can be taken as a Read stream. We can pipe read streams.
    // pipe collects streamed bits and dispatches the data when a chunk is formed, into the destination specified in its arguments.
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

}
