import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentGuideComponent } from './parent-guide.component';

describe('ParentGuideComponent', () => {
  let component: ParentGuideComponent;
  let fixture: ComponentFixture<ParentGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
