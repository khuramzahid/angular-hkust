import { TestBed, async, inject } from '@angular/core/testing';

import { DishRouteGuardGuard } from './dish-route-guard.guard';

describe('DishRouteGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DishRouteGuardGuard]
    });
  });

  it('should ...', inject([DishRouteGuardGuard], (guard: DishRouteGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
