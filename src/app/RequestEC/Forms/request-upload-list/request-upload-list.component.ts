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

@Component({
  selector: 'app-request-upload-list',
  standalone: true,
  imports: [CommonModule,MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, 
      MatCheckboxModule, MatInputModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './request-upload-list.component.html',
  styleUrls: ['./request-upload-list.component.css']
})


export class RequestUploadListComponent implements OnInit {
  p_usr : string="aaaaa";
  p_reqno: string="aaaaa";
  p_type:string ="aaaaa";
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

  selectedFile1: any = null;
  file1image?:File;
  file1img:string="a";

  selectedFile2: any = null;
  file2image?:File;
  file2img:string="a";

  selectedFile3: any = null;
  file3image?:File;
  file3img:string="a";

  selectedFile4: any = null;
  file4image?:File;
  file4img:string="a";

  rdtl : RequestDtl[]=[];
  dataSource!: MatTableDataSource<any>;

  userid: string = 'USER09';
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

  constructor(private reqServ : RequestServService, private formBuider: FormBuilder, 
    private route: ActivatedRoute,private masterserv: ProductProducttypeServService){
    
  }


  ngOnInit(): void {  
    console.log("URL:", this.route.url); 
    this.route.params.subscribe(params => {
     this.p_type = params['param1'];
     this.p_reqno= params['param2'];
    });
    alert('bbbbbb :'+this.p_type+" ---- "+this.p_reqno);
    this.getProductList();
    if (this.p_type='Update'){
      this.getRequestDtl(this.p_reqno);
    }
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

  getRequestDtl(req:string){
//  alert("customer no :"+this.custcd);
alert('cccccc');
this.rdtl=[];
this.reqServ.getReqEcById(req).subscribe((res:RequestDtl[])=>{
  this.rdtl=res;
  for (var j = 0; j < this.rdtl.length; j++) {
  this.data.ctecdCtechId=this.rdtl[j].ctecdCtechId;
  this.data.ctecdId=this.rdtl[j].ctecdId;
  this.data.ctecdProductCode=this.rdtl[j].ctecdProductCode;
  this.data.ctecdProducttypeCode=this.rdtl[j].ctecdProducttypeCode;
  this.data.ctecdProductName=this.rdtl[j].ctecdProductName;
  this.data.ctecdProducttypeName=this.rdtl[j].ctecdProducttypeName;
  this.data.ctecdProductTypeAlias=this.rdtl[j].ctecdProductTypeAlias;
  this.data.ctecdProducttypeStockQty=this.rdtl[j].ctecdProducttypeStockQty;
  this.data.ctecdProducttypePrice=this.rdtl[j].ctecdProducttypePrice;
  this.data.ctecdProducttypeMinQty=this.rdtl[j].ctecdProducttypeMinQty;
  this.data.ctecdProductTypeSize=this.rdtl[j].ctecdProductTypeSize;
  this.data.ctecdProductTypeSpec=this.rdtl[j].ctecdProductTypeSpec;
  this.data.ctecdProducttypeDesc=this.rdtl[j].ctecdProducttypeDesc;

  }

 });   
}
  

  onFileSelected(event: any, fileNumber: number) {
    switch (fileNumber) {
      case 1:
        this.preview='';
        const cfile1 = event.target.files;
        const selectedFil1 = event.target.files;
        this.selectedFile1 = event.target.files[0] as File;
        if (selectedFil1){
          const fil:File | null =selectedFil1.item(0);
          if (fil){
            this.preview='';
            this.file1image=fil;
            this.file1img=this.file1image.name;
            const reader = new FileReader();

            reader.onload=(e:any) => {
              console.log(e.target.result);
              this.preview=e.target.result;
            };

            reader.readAsDataURL(this.file1image);
          }
        }            
        break;
      case 2:
        this.preview2='';
        const cfile2 = event.target.files;
        const selectedFil2 = event.target.files;
        this.selectedFile2 = event.target.files[0] as File;
        if (selectedFil2){
          const fil:File | null =selectedFil2.item(0);
          if (fil){
            this.preview2='';
            this.file2image=fil;
            this.file2img=this.file2image.name;
            const reader = new FileReader();

            reader.onload=(e:any) => {
              console.log(e.target.result);
              this.preview2=e.target.result;
            };

            reader.readAsDataURL(this.file2image);
          }
        }
        break;
      case 3:
        this.preview3='';
        const cfile3 = event.target.files;
        const selectedFil3 = event.target.files;
        this.selectedFile3 = event.target.files[0] as File;
        if (selectedFil3){
          const fil:File | null =selectedFil3.item(0);
          if (fil){
            this.preview3='';
            this.file3image=fil;
            this.file3img=this.file3image.name;
            const reader = new FileReader();
            reader.onload=(e:any) => {
              console.log(e.target.result);
              this.preview3=e.target.result;
            };
            reader.readAsDataURL(this.file3image);
          }
        }
        break;
      case 4:
        this.preview4='';
        const cfile4 = event.target.files;
        const selectedFil4 = event.target.files;
        this.selectedFile4 = event.target.files[0] as File;
        if (selectedFil4){
          const fil:File | null =selectedFil4.item(0);
          if (fil){
            this.preview4='';
            this.file4image=fil;
            this.file4img=this.file4image.name;
            const reader = new FileReader();

            reader.onload=(e:any) => {
              console.log(e.target.result);
              this.preview4=e.target.result;
            };

            reader.readAsDataURL(this.file4image);
          }
        }
        break;
    }
  }


  submitRequest() {
    this.data.ctecdProductCode=this.selectedprod;
    this.data.ctecdProducttypeCode=this.selectedprodtype;
    this.reqServ.createReqWeb(this.userid, this.data, this.selectedFile1, this.selectedFile2, this.selectedFile3, this.selectedFile4)
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
