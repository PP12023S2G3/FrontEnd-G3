import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFormularioComponent } from './content-formulario.component';

describe('ContentFormularioComponent', () => {
  let component: ContentFormularioComponent;
  let fixture: ComponentFixture<ContentFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentFormularioComponent]
    });
    fixture = TestBed.createComponent(ContentFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
