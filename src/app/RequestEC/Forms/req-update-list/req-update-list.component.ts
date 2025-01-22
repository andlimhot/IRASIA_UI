import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RequestServService } from '../../Services/request-serv.service';
import { productlist } from 'src/app/MasterApps/Models/productlist';
import { producttypelist } from 'src/app/MasterApps/Models/productypelist';
import { ProductProducttypeServService } from 'src/app/MasterApps/Services/product-producttype-serv.service';
import { RequestDtl } from '../../Models/RequestDtl';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { requestlistupd } from '../../Models/requestlistupd';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RequestUploadListComponent } from '../request-upload-list/request-upload-list.component';

@Component({
  selector: 'app-req-update-list',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule,
    MatCheckboxModule, MatInputModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet, MatDialogModule],
  templateUrl: './req-update-list.component.html',
  styleUrls: ['./req-update-list.component.css']
})
export class ReqUpdateListComponent implements OnInit {
  p_usr: string = "aaaaa";
  p_reqno: string = "aaaaa";
  p_type: string = "aaaaa";
  
  file1img: string = "a"; 
  file2img: string = "a";  
  file3img: string = "a";  
  file4img: string = "a";
 

  prodlist: productlist[] = [];
  prodtylist: producttypelist[] = [];
  rdtl: RequestDtl[] = [];
  userid: string = 'USER09';
  imageUrls: string[] = [];  
  productName: string = "ccc"; 
  producttype: string = "aaaa";
  data: requestlistupd[] = [];

  constructor(private reqServ: RequestServService, private formBuider: FormBuilder, private dialog:MatDialog,
    private route: ActivatedRoute, private masterserv: ProductProducttypeServService) {

  }

  ngOnInit(): void {
    console.log("URL:", this.route.url);
    this.route.params.subscribe(params => {
      this.p_type = params['param1'];
      this.p_reqno = params['param2'];
    });
    this.getRequestDtl(this.p_reqno);
  }

  async getRequestDtl(req: string) {
    this.rdtl = [];
    this.data = [];
    this.reqServ.getReqEcById(req).subscribe(async (res: RequestDtl[]) => {
      this.rdtl = res;
     
      for (var j = 0; j < this.rdtl.length; j++) {
        await this.delay(50); 
        this.file1img='';
        this.file2img='';
        this.file3img='';
        this.file4img='';// Tunggu 1/2 detik
        // alert("dddddd: "+ this.rdtl[j].ctecdCtechId);
        this.reqServ.getImages(this.userid, this.rdtl[j].ctecdCtechId, this.rdtl[j].ctecdId.toString() ).subscribe(
          (data: string[]) => {
            this.imageUrls = data;
             //  alert("eeeekkkkk1111: "+ this.imageUrls.length );
            for (var k = 0; k < this.imageUrls.length; k++) {

              if (k == 0) {  // <-- Diperbaiki
                this.file1img = this.imageUrls[k];

              }
              if (k == 1) {
                this.file2img = this.imageUrls[k];
              }
              if (k == 2) {
                this.file3img = this.imageUrls[k];
              }
              if (k == 3) {
                this.file4img = this.imageUrls[k];
              }
            }
          },
          (error) => {
            console.error('Error fetching images:', error);
          }
        );

        await this.delay(50); // Tunggu 1/2 detik


        this.data.push({
          prodno: this.rdtl[j].ctecdId,
          prodname: this.rdtl[j].ctecdProductName,
          prodtypename: this.rdtl[j].ctecdProducttypeName,
          prodprice: this.rdtl[j].ctecdProducttypePrice.toString(),
          proddesc: this.rdtl[j].ctecdProducttypeDesc,
          prodAlias: this.rdtl[j].ctecdProductTypeAlias,
          prodsize: this.rdtl[j].ctecdProductTypeSize,
          prodStock: this.rdtl[j].ctecdProducttypeStockQty.toString(),
          prodMinpurc: this.rdtl[j].ctecdProducttypeMinQty.toString(),
          previmg: this.file1img, 
          previmg2: this.file2img, 
          previmg3: this.file3img, 
          previmg4: this.file4img, 
        });
      }
    });
  }

  getProductList(code: String) {
  
    this.masterserv.getProductByCode(code).subscribe((res: productlist[]) => {
      this.prodlist = res;
      this.productName = this.prodlist[0].cmprName;

    });
  }

  getProducttypeList(value: any) {
    this.masterserv.getProductTypeByCode(value).subscribe((res: producttypelist[]) => {
      this.prodtylist = res;
      this.producttype = this.prodtylist[0].cmprtTypeDesc;
    });

  }

    updateRequest(ptranstype:string, no:string){
         const dialogRef =this.dialog.open(RequestUploadListComponent,{height:'90%',width:'80%'},);
           dialogRef.afterClosed().subscribe({
             next:(val) =>{
               if (val) {
                 //this.getListFaktur();
                 //sessionStorage.setItem("dsono", this.dtparam);  
       
               }
             }
           });        
           dialogRef.componentInstance.p_usr=this.p_usr;
           dialogRef.componentInstance.p_type=this.p_type;  
           dialogRef.componentInstance.p_no=no;
           dialogRef.componentInstance.p_reqno=this.p_reqno;
         }

    delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
}
