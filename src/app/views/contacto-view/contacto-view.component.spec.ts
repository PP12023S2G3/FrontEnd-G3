import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoViewComponent } from './contacto-view.component';

describe('ContactoViewComponent', () => {
  let component: ContactoViewComponent;
  let fixture: ComponentFixture<ContactoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactoViewComponent]
    });
    fixture = TestBed.createComponent(ContactoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
