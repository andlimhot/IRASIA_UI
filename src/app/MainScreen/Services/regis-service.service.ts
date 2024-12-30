import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisServiceService {

  constructor(private http:HttpClient) { }

  
  saveupdateRegis(data:any):Observable<any>{   
    return this.http.post("http://localhost:9509/invrep-svc/bahanbaku/saveupdbatchbaku",data, {responseType: 'text' as 'text'});
   }

}
