import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortResponseComponent } from './short-response.component';

describe('ShortResponseComponent', () => {
  let component: ShortResponseComponent;
  let fixture: ComponentFixture<ShortResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
