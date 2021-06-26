import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterMeAppComponent } from './water-me-app.component';

describe('WaterMeAppComponent', () => {
  let component: WaterMeAppComponent;
  let fixture: ComponentFixture<WaterMeAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterMeAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterMeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
