import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAtencionComponent } from './form-atencion.component';

describe('FormAtencionComponent', () => {
  let component: FormAtencionComponent;
  let fixture: ComponentFixture<FormAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAtencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
