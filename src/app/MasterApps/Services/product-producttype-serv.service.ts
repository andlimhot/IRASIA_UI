import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productlist } from '../Models/productlist';
import { producttypelist } from '../Models/productypelist';

@Injectable({
  providedIn: 'root'
})
export class ProductProducttypeServService {

  constructor(private http:HttpClient) { }

   getProductList(): Observable<any>{
      return this.http.get<Array<productlist>>("http://localhost:8090/am-svc/appmst/getCmprListAll");  
    }

    getImageProducts(): Observable<string[]> {
      const url = `http://localhost:8090/am-svc/images/productImg`;
      return this.http.get<string[]>(url);
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
}
