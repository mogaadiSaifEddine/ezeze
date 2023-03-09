import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiBuilderComponent } from './csi-builder.component';

describe('CsiBuilderComponent', () => {
  let component: CsiBuilderComponent;
  let fixture: ComponentFixture<CsiBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsiBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsiBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
