import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { provincemdl } from '../Models/provincemdl';
import { citymdl } from '../Models/citymdl';
import { kecamatanmdl } from '../Models/kecamatanmdl';
import { kelurahanmdl } from '../Models/kelurahanmdl';

@Injectable({
  providedIn: 'root'
})
export class RegisServiceService {

  constructor(private http:HttpClient) { }
  
  getProvinceALL(): Observable<any>{
    return this.http.get<Array<provincemdl>>("http://localhost:8090/am-svc/appmst/getCmpsiListAll");  
  }

  getcitybyprovALL(provcode:string): Observable<any>{
    return this.http.get<Array<citymdl>>("http://localhost:8090/am-svc/appmst/getCmcitListByProvCode?ProvCode="+provcode);  
  }

  getKecbyCityALL(citycode:string): Observable<any>{
    return this.http.get<Array<kecamatanmdl>>("http://localhost:8090/am-svc/appmst/getCmkecListByCityCode?CityCode="+citycode);  
  }

  getKelbyKecALL(keccode:string): Observable<any>{
    return this.http.get<Array<kelurahanmdl>>("http://localhost:8090/am-svc/appmst/getCmkelListByKecCode?KecCode="+keccode);  
  }

  

  getBankALL(): Observable<any>{
    return this.http.get<Array<kelurahanmdl>>("http://localhost:8090/am-svc/appmst/getCmbaListAll");  
  }
  
  
  saveupdateRegis(data:any):Observable<any>{   
    return this.http.post("http://localhost:9509/invrep-svc/bahanbaku/saveupdbatchbaku",data, {responseType: 'text' as 'text'});
   }

}
