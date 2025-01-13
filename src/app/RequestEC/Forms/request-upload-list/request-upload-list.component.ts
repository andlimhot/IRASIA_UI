import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-request-upload-list',
  standalone: true,
  imports: [CommonModule,MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, 
      MatCheckboxModule, MatInputModule, FormsModule],
  templateUrl: './request-upload-list.component.html',
  styleUrls: ['./request-upload-list.component.css']
})
export class RequestUploadListComponent implements OnInit {

  ReQForm: FormGroup;
  preview='';
  preview2='';
  preview3='';
  preview4='';
  coreTransRequestEcDtl: RequestDtl[] = [];
  prodlist:productlist[]=[];
  prodtylist:producttypelist[]=[];
  selectedprod:string="";
  selectedprodtype:string="";
  selectedFiles: File[] = [];

  userid: string = 'USer01';
  data: RequestDtl = { 
    ctecdCtechId: "",
    ctecdId: "",
    ctecdProductCode: "",
    ctecdProductName: "",
    ctecdProducttypeCode: "",
    ctecdProducttypeName: "",
    ctecdProducttypeStockQty: 0,
    ctecdProducttypeMinQty: 0,
    ctecdProducttypePrice: 0,
    ctecdProducttypeRangeQty1: 0,
    ctecdProducttypeRangePrice1: 0,
    ctecdProducttypeRangeQty2: 0,
    ctecdProducttypeRangePrice2: 0,
    ctecdProducttypeDesc: "",
    ctecdProductTypeSize: "",
    ctecdProductTypeSpec: "",
    ctecdProductTypeAlias: "",
    ctecdProdTypeImg1Filename: "",
    ctecdProdTypeImg1Filepath: "",
    ctecdProdTypeImg2Filename: "",
    ctecdProdTypeImg2Filepath: "",
    ctecdProdTypeImg3Filename: "",
    ctecdProdTypeImg3Filepath: "",
    ctecdProdTypeImg4Filename: "",
    ctecdProdTypeImg4Filepath: "",
    ctecdNewUsed: "",
    ctecdStatus: "",
    ctecdReason: "",
    ctecdCreateBy: "",
    ctecdCreateDate: "",
    ctecdUpdateBy: "",
    ctecdUpdateDate: "",
    ctecdBestPrice: "",
    ctecdBestProduct: "",
    ctecdNewProduct: "",
    ctecdSale: "",
    ctecdImg1CtpicRefNo: "",
    ctecdImg1CtpicSeqNo: "",
    ctecdImg2CtpicRefNo: "",
    ctecdImg2CtpicSeqNo: "",
    ctecdImg3CtpicRefNo: "",
    ctecdImg3CtpicSeqNo: "",
    ctecdImg4CtpicRefNo: "",
    ctecdImg4CtpicSeqNo: ""
  };
  file1: any = null;
  file2: any = null;
  file3: any = null;
  file4: any = null;
  requestNumber: string = '';

  constructor(private reqServ : RequestServService, private formBuider: FormBuilder, private masterserv: ProductProducttypeServService){
    this.ReQForm = this.formBuider.group({
      ctecdCtechId: "",
    ctecdId: "",
    ctecdProductCode: "",
    ctecdProductName: "",
    ctecdProducttypeCode: "",
    ctecdProducttypeName: "",
    ctecdProducttypeStockQty: "",
    ctecdProducttypeMinQty: "",
    ctecdProducttypePrice: "",
    ctecdProducttypeRangeQty1: "",
    ctecdProducttypeRangePrice1: "",
    ctecdProducttypeRangeQty2: "",
    ctecdProducttypeRangePrice2: "",
    ctecdProducttypeDesc: "",
    ctecdProductTypeSize: "",
    ctecdProductTypeSpec: "",
    ctecdProductTypeAlias: "",
    ctecdProdTypeImg1Filename: "",
    ctecdProdTypeImg1Filepath: "",
    ctecdProdTypeImg2Filename: "",
    ctecdProdTypeImg2Filepath: "",
    ctecdProdTypeImg3Filename: "",
    ctecdProdTypeImg3Filepath: "",
    ctecdProdTypeImg4Filename: "",
    ctecdProdTypeImg4Filepath: "",
    ctecdNewUsed: "",
    ctecdStatus: "",
    ctecdReason: "",
    ctecdCreateBy: "",
    ctecdCreateDate: "",
    ctecdUpdateBy: "",
    ctecdUpdateDate: "",
    ctecdBestPrice: "",
    ctecdBestProduct: "",
    ctecdNewProduct: "",
    ctecdSale: "",
    ctecdImg1CtpicRefNo: "",
    ctecdImg1CtpicSeqNo: "",
    ctecdImg2CtpicRefNo: "",
    ctecdImg2CtpicSeqNo: "",
    ctecdImg3CtpicRefNo: "",
    ctecdImg3CtpicSeqNo: "",
    ctecdImg4CtpicRefNo: "",
    ctecdImg4CtpicSeqNo: ""
    });
  }


  ngOnInit(): void {  
    this.getProductList();
  }

  changeproduct() {
    this.prodtylist  =[];    
    this.getProducttypeList(this.selectedprod);
    
  }

  getProductList(){
     this.prodtylist = [];
      this.masterserv.getProductList().subscribe((res: productlist[]) => {
        this.prodlist = res; 
      });
  }

  getProducttypeList(value: any){  
     this.prodtylist = [];
     
      this.masterserv.getProductTypeList(value).subscribe((res: producttypelist[]) => {
        this.prodtylist = res;        
      });
      
  }

  onFileSelected(event: any, fileNumber: number) {
    switch (fileNumber) {
      case 1:
        this.file1 = event.target.files[0];
        break;
      case 2:
        this.file2 = event.target.files[0];
        break;
      case 3:
        this.file3 = event.target.files[0];
        break;
      case 4:
        this.file4 = event.target.files[0];
        break;
    }
  }


  submitRequest() {
    this.reqServ.createReqWeb(this.userid, this.data, this.file1, this.file2, this.file3, this.file4)
      .subscribe(
        response => {
          this.requestNumber = response;
          console.log('Request berhasil dibuat dengan nomor:', this.requestNumber);
          // Tambahkan logika untuk menangani response sukses, misalnya:
          // - Reset form
          // - Tampilkan pesan sukses
          // - Redirect ke halaman lain
        },
        error => {
          console.error('Terjadi kesalahan:', error);
          // Tambahkan logika untuk menangani error, misalnya:
          // - Tampilkan pesan error
        }
      );
  }
}
