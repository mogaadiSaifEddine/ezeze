import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceProfComponent } from './espace-prof.component';

describe('EspaceProfComponent', () => {
  let component: EspaceProfComponent;
  let fixture: ComponentFixture<EspaceProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceProfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
