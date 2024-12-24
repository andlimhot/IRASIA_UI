import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLogoutComponent } from './form-logout.component';

describe('FormLogoutComponent', () => {
  let component: FormLogoutComponent;
  let fixture: ComponentFixture<FormLogoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormLogoutComponent]
    });
    fixture = TestBed.createComponent(FormLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
