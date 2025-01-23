import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productlist } from '../Models/productlist';
import { producttypelist } from '../Models/productypelist';

@Injectable({
  providedIn: 'root'
})
export class ProductProducttypeServService {
  dataprod = [
    { 
      prodno: '1',
      title: 'Product 1', 
      image: 'assets/product1.jpg', 
      price: '$10',
      description: 'This is product 1'
    },
    { 
      prodno: '2',
      title: 'Product 2', 
      image: 'assets/product2.jpg', 
      price: '$20',
      description: 'This is product 2' 
    },
    // ... more products
  ];

  showDropdown: boolean[] = this.dataprod.map(() => false); 
  
    constructor(private http:HttpClient) { }

   getProductList(): Observable<any>{
      return this.http.get<Array<productlist>>("http://localhost:8090/am-svc/appmst/getCmprListAll");  
    }

    getImageProducts(): Observable<string[]> {
      const url = `http://localhost:8090/am-svc/images/productImg`;
      return this.http.get<string[]>(url);
    }

    getProductLypeImage(prodcode:string): Observable<any>{
      const url = `http://localhost:8090/am-svc/images/producttype/${prodcode}`;
      return this.http.get<Array<producttypelist>>(url);
    }

    

    getProductTypeList(code:String): Observable<any>{
      return this.http.get<Array<producttypelist>>("http://localhost:8090/am-svc/appmst/getCmprtListByCmprCode?CmprCode="+code);  
    }

    getProductByCode(code:String): Observable<any>{
      return this.http.get<Array<productlist>>("http://localhost:8090/am-svc/appmst/getCmprSingle?code="+code);  
    }

    getProductTypeByCode(code:String): Observable<any>{
      return this.http.get<Array<producttypelist>>("http://localhost:8090/am-svc/appmst/getCmprtListByCmprCode?CmprCode="+code);  
    }

    getImages(custNo: string, requestno: string, no: string): Observable<string[]> {
    const url = `http://localhost:8091/wc-svc/images/${custNo}/REQUEST/${requestno}?no=${no}`;
    return this.http.get<string[]>(url);
  }
}
