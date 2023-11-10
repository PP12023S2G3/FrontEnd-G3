import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwofactorViewComponent } from './two-factor-view.component';

describe('TwofactorViewComponent', () => {
  let component: TwofactorViewComponent;
  let fixture: ComponentFixture<TwofactorViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwofactorViewComponent]
    });
    fixture = TestBed.createComponent(TwofactorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
