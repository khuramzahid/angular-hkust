import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  dishErrMess: string;
  promotion: Promotion;
  promotionErrMess: string;
  leader: Leader;
  leaderErrMess: string;
  dishLoadingMessage: string;
  promoLoadingMessage: string;
  leaderLoadingMessage: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') private baseURL) {
      /*
      "constructor(private dishservice: DishService) {}" is short hand syntax for the following code:
      private dishservice: DishService;
      constructor(injectedDishService: DishService) {
        this.dishservice = injectedDishService;
      }
      */
    }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess,
        () => console.log("Observable sequence completion"));
    // this.dishservice.getFeaturedDish() returns an object. That object also has a method to cancel request.
    // <any>errmess is typecasting to 'any' type

    this.promotionservice.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
        errmess => this.promotionErrMess = <any>errmess);

    this.leaderservice.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
        errmess => this.leaderErrMess = <any>errmess);

    this.dishLoadingMessage = "Loading Featured Dish...";
    this.promoLoadingMessage = "Loading Featured Promotion...";
    this.leaderLoadingMessage = "Loading Featured Leader...";

  }
  onNotify(message: string): void {
    //debugger;
    console.log(message , " spinner Initialized.");
  }

}
