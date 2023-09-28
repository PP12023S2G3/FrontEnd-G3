import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioViewComponent } from './inicio-view.component';

describe('InicioViewComponent', () => {
  let component: InicioViewComponent;
  let fixture: ComponentFixture<InicioViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioViewComponent]
    });
    fixture = TestBed.createComponent(InicioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
