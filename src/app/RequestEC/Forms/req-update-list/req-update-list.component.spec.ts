import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqUpdateListComponent } from './req-update-list.component';

describe('ReqUpdateListComponent', () => {
  let component: ReqUpdateListComponent;
  let fixture: ComponentFixture<ReqUpdateListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReqUpdateListComponent]
    });
    fixture = TestBed.createComponent(ReqUpdateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
