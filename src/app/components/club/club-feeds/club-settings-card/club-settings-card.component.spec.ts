import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubSettingsCardComponent } from './club-settings-card.component';

describe('ClubSettingsCardComponent', () => {
  let component: ClubSettingsCardComponent;
  let fixture: ComponentFixture<ClubSettingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubSettingsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubSettingsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
