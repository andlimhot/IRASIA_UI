import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { productlist } from 'src/app/MasterApps/Models/productlist';
import { ProductProducttypeServService } from 'src/app/MasterApps/Services/product-producttype-serv.service';
import { producttypelist } from 'src/app/MasterApps/Models/productypelist';
import { scrollproductlist } from '../../Models/scrollproductlist';


@Component({
  selector: 'app-products-product-types',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-product-types.component.html',
  styleUrls: ['./products-product-types.component.css']
})
export class ProductsProductTypesComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;
  prodlist: productlist[] = [];
  dataprod: scrollproductlist[] = [];
  dataprodtype: scrollproductlist[] = [];
  prodtylist: producttypelist[] = [];
  currentIndex = 1;
  productcode: string = "ccc";
  producttype: string = "aaaa";
  imageUrls: string[] = [];

  showDropdown: boolean[] = [];
  showHomeDropdown = false;

  constructor(private servmaster: ProductProducttypeServService) {

  };

  ngOnInit(): void {
    this.getProductList();

  };

  getbank() {
    this.prodlist = [];
    this.servmaster.getProductList().subscribe((res: productlist[]) => {
      this.prodlist = res;
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.dataprod.length;

    this.updateCarouselPosition();

  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.dataprod.length) % this.dataprod.length;
    if ((this.currentIndex * 2) < (this.currentIndex - 1 + this.dataprod.length)) {
      this.updateCarouselPosition();
    } else {
      this.currentIndex = 1;
    }
  }

  async getProductList() {
    this.prodlist = [];
    this.dataprod = [];
    await this.getImageProducts();
    this.servmaster.getProductList().subscribe((res: productlist[]) => {
      this.prodlist = res;
      this.productcode = this.prodlist[0].cmprCode.toString();
      for (var k = 0; k < this.prodlist.length; k++) {
        this.dataprod.push({
          prodno: this.prodlist[k].cmprCode.toString(),
          image: this.imageUrls[k],
          title: this.prodlist[k].cmprName,
        });
      }
    });
  }

  async getProducttypeList(value: any) {
    this.prodtylist = [];
    this.dataprodtype = [];
   // await this.getImageProducts();
    this.servmaster.getProductTypeList(value).subscribe((res: producttypelist[]) => {
      this.prodtylist = res;
      for (var k = 0; k < this.prodlist.length; k++) {
        alert("aaaaa :"+this.prodtylist[k].cmprtImgFilepath);
      }
      //this.productcode = this.prodlist[0].cmprCode.toString();
    //  for (var k = 0; k < this.prodlist.length; k++) {
    //    this.dataprod.push({
     //     prodno: this.prodlist[k].cmprCode.toString(),
     //     image: this.imageUrls[k],
     //     title: this.prodlist[k].cmprName,
   //     });
   //   }
    });
  }

  async getImageProducts() {
    this.servmaster.getImageProducts().subscribe(
      (data: string[]) => {
        this.imageUrls = data;
        //  alert("eeeekkkkk1111: "+ this.imageUrls.length );
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }

  pickProduct(no: string) {
    this.getProducttypeList(no);
  }

  updateCarouselPosition() {
    const carouselElement = this.carousel.nativeElement;
    const itemWidth = carouselElement.querySelector('div').offsetWidth + this.dataprod.length; // Lebar satu item + margin
    const translateX = -this.currentIndex * itemWidth;
    carouselElement.style.transform = `translateX(${translateX}px)`;
  }
}