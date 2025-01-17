import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet,Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';
import { vrequestlist } from '../../Models/vrequestlist';
import { RequestServService } from '../../Services/request-serv.service';
import { RequestUploadListComponent } from '../request-upload-list/request-upload-list.component';



@Component({
  selector: 'app-list-request',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive,MatInputModule,MatButtonModule,MatCardModule,
    MatFormFieldModule,MatNativeDateModule,MatPaginatorModule,MatTableModule,
    MatIconModule, FormsModule, ReactiveFormsModule,MatDialogModule, 
    MatSortModule,  RouterModule, RouterModule, RouterLink],
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})


export class ListRequestComponent implements OnInit{
  displayedColumns: string[] = ['nourut', 'vrlReqno','vrlCustno','vrlDate','vrlStatus','vrlDateSort','vrlProductNo','action'];
  vrllist:vrequestlist[]=[];
  vct:number=0;
  usr:string="USER09";
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _vrlserv:RequestServService,  private _router: Router, private dialog:MatDialog){    
  }

  ngOnInit(): void {
    this.getVrlByUser();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getVrlByUser(){
    this.vrllist=[];
    this.vct=0;
    this._vrlserv.getVReqByuser(this.usr).subscribe((res:vrequestlist[])=>{
      this.vrllist=res;
      this.dataSource=new MatTableDataSource(this.vrllist);
      this.dataSource.data.forEach( async item => {
        this.vct=this.vct+1;
        item.nourut=this.vct;
      });    
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
     
      error:(error: HttpErrorResponse):void =>{
        if (error instanceof ErrorEvent){
                }else{
          //server side error
        }
       }
    })  
    }

    AddRequest(ptranstype:string){
      const dialogRef =this.dialog.open(RequestUploadListComponent,{height:'90%',width:'80%'},);
        dialogRef.afterClosed().subscribe({
          next:(val) =>{
            if (val) {
              //this.getListFaktur();
              //sessionStorage.setItem("dsono", this.dtparam);  
    
            }
          }
        });
        
        dialogRef.componentInstance.p_usr=this.usr;
        dialogRef.componentInstance.p_type='ptranstype';
  
      }

      UpdateRequest(tipe:string, reqno:string){
       
        this._router.navigate(['RequestCU', tipe,reqno]);
     
        
        }

     
}




