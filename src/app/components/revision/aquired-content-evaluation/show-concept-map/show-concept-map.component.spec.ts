import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConceptMapComponent } from './show-concept-map.component';

describe('ShowConceptMapComponent', () => {
  let component: ShowConceptMapComponent;
  let fixture: ComponentFixture<ShowConceptMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowConceptMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowConceptMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
