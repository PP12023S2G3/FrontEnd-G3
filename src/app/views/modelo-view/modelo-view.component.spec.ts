import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloViewComponent } from './modelo-view.component';

describe('ModeloViewComponent', () => {
  let component: ModeloViewComponent;
  let fixture: ComponentFixture<ModeloViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeloViewComponent]
    });
    fixture = TestBed.createComponent(ModeloViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
