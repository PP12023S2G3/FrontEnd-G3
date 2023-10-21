import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDiagnosticComponent } from './form-diagnostic.component';

describe('ContentFormularioComponent', () => {
  let component: FormDiagnosticComponent;
  let fixture: ComponentFixture<FormDiagnosticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDiagnosticComponent]
    });
    fixture = TestBed.createComponent(FormDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
