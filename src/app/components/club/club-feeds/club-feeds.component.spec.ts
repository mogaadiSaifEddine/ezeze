import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubFeedsComponent } from './club-feeds.component';

describe('ClubFeedsComponent', () => {
  let component: ClubFeedsComponent;
  let fixture: ComponentFixture<ClubFeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubFeedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
