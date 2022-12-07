import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubFeedCommentComponent } from './club-feed-comment.component';

describe('ClubFeedCommentComponent', () => {
  let component: ClubFeedCommentComponent;
  let fixture: ComponentFixture<ClubFeedCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubFeedCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubFeedCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
