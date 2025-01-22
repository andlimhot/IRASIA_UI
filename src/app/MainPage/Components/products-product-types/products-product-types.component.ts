import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { productlist } from 'src/app/MasterApps/Models/productlist';
import { ProductProducttypeServService } from 'src/app/MasterApps/Services/product-producttype-serv.service';
import { producttypelist } from 'src/app/MasterApps/Models/productypelist';
import { scrollproductlist } from '../../Models/scrollproductlist';

interface Item {
  image: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
}


@Component({
  selector: 'app-products-product-types',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-product-types.component.html',
  styleUrls: ['./products-product-types.component.css']
})
export class ProductsProductTypesComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;
  prodlist:productlist[]=[];
  dataprod:scrollproductlist[]=[];
  prodtylist: producttypelist[] = [];
  currentIndex = 1;
  productName: string = "ccc"; 
  producttype: string = "aaaa";
  imageUrls: string[] = [];  

  constructor(private servmaster:ProductProducttypeServService){
  
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
    if ((this.currentIndex*2)<(this.currentIndex - 1 + this.dataprod.length)){      
    this.updateCarouselPosition();
  }else{
    this.currentIndex=1;
  }
  }

  async getProductList() {
    this.prodlist=[];
    this.dataprod=[];
    await this.getImageProducts();
      this.servmaster.getProductList().subscribe((res: productlist[]) => {
        this.prodlist = res;
        this.productName = this.prodlist[0].cmprName;
        for (var k = 0; k < this.prodlist.length; k++) {
          this.dataprod.push({
            prodno:this.prodlist[k].cmprCode.toString(),
            image: this.imageUrls[k],
            title: this.prodlist[k].cmprName,     
          });
          
        }
  
      });
    }
  
    getProducttypeList(value: any) {
      this.servmaster.getProductTypeByCode(value).subscribe((res: producttypelist[]) => {
        this.prodtylist = res;
        this.producttype = this.prodtylist[0].cmprtTypeDesc;
      });
  
    }

    async getImageProducts(){
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

    pickProduct(no:string){
      alert("aaaaaa :"+no);
    }



  updateCarouselPosition() {
    const carouselElement = this.carousel.nativeElement;
    const itemWidth = carouselElement.querySelector('div').offsetWidth + this.dataprod.length; // Lebar satu item + margin
    const translateX = -this.currentIndex * itemWidth;
    carouselElement.style.transform = `translateX(${translateX}px)`;
  }
}