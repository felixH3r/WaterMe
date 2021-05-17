import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsListingComponent } from './plants-listing.component';

describe('PlantsListingComponent', () => {
  let component: PlantsListingComponent;
  let fixture: ComponentFixture<PlantsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
