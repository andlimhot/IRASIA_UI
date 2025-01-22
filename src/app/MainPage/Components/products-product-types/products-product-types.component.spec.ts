import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProductTypesComponent } from './products-product-types.component';

describe('ProductsProductTypesComponent', () => {
  let component: ProductsProductTypesComponent;
  let fixture: ComponentFixture<ProductsProductTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductsProductTypesComponent]
    });
    fixture = TestBed.createComponent(ProductsProductTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
