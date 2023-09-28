import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialViewComponent } from './historial-view.component';

describe('HistorialViewComponent', () => {
  let component: HistorialViewComponent;
  let fixture: ComponentFixture<HistorialViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialViewComponent]
    });
    fixture = TestBed.createComponent(HistorialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
