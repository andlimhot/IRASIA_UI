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
  prodlist:productlist[]=[];
  prodtylist:producttypelist[]=[];
  selectedprod:string="";
  selectedprodtype:string="";

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
    })
  }


  ngOnInit(): void {  
    this.getProductList();
  }

  changeproduct() {
    this.prodtylist  =[];    
    alert(this.selectedprod);
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
}
