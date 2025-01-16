import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestDtl } from '../Models/RequestDtl';
import { vrequestlist } from '../Models/vrequestlist';

@Injectable({
  providedIn: 'root'
})
export class RequestServService {
  curDate=new Date();
  constructor(private http: HttpClient) { }

  getAllReqEc(): Observable<RequestDtl[]> {
    return this.http.get<RequestDtl[]>("http://localhost:8091/wc-svc/webcust/getCtecdListAll");
  }

  getReqEcById(id: number): Observable<RequestDtl> {
    return this.http.get<RequestDtl>("http://localhost:8091/wc-svc/webcust/getCtecdListByCtechId?CtechId="+id);
  }

  getVReqByuser(usr:string): Observable<vrequestlist[]> {
    return this.http.get<vrequestlist[]>("http://localhost:8091/wc-svc/webcust/getVReqByUser?usr="+usr);
  }

  createReqWeb(userid: string, data: RequestDtl, file1: File, file2: File, file3: File, file4: File): Observable<string> {
    const formData = new FormData();
    formData.append('userid', userid);
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    if (file1) { formData.append('file1', file1); }
    if (file2) { formData.append('file2', file2); }
    if (file3) { formData.append('file3', file3); }
    if (file4) { formData.append('file4', file4); }

    return this.http.post<string>('http://localhost:8091/wc-svc/webcust/saveupdreqecdtl', formData);
  }

/*
  updateProduct(id: number, product: Product, files: FileList): Observable<Product> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', String(product.price));
    formData.append('custNo', product.custNo);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }
    return this.http.put<Product>(`${this.baseUrl}/${id}`, formData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  */
}
