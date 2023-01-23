import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapesGroupsBuilderComponent } from './shapes-groups-builder.component';

describe('ShapesGroupsBuilderComponent', () => {
  let component: ShapesGroupsBuilderComponent;
  let fixture: ComponentFixture<ShapesGroupsBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapesGroupsBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapesGroupsBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
