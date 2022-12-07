import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubFeedsCardComponent } from './club-feeds-card.component';

describe('ClubFeedsCardComponent', () => {
  let component: ClubFeedsCardComponent;
  let fixture: ComponentFixture<ClubFeedsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubFeedsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubFeedsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
