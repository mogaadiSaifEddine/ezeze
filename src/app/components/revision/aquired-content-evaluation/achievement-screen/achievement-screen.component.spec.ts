import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementScreenComponent } from './achievement-screen.component';

describe('AchievementScreenComponent', () => {
  let component: AchievementScreenComponent;
  let fixture: ComponentFixture<AchievementScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchievementScreenComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AchievementScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
