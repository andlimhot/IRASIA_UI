import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormLoginComponent } from '../form-login/form-login.component';
import { FormUserLoginComponent } from '../form-user-login/form-user-login.component';

interface carouselImage{
  imageScr:String;
  imageAlt:String;
}


@Component({
  selector: 'app-form-logout',
  standalone: true,
  imports: [CommonModule, FormLoginComponent, MatDialogModule ],
  templateUrl: './form-logout.component.html',
  styleUrls: ['./form-logout.component.css']
})
export class FormLogoutComponent implements OnInit {
  title = 'IRON ASIA';
 
 images : carouselImage[] = [
  {
    imageScr: '/assets/besi1.jpeg', 
    imageAlt: 'natur1'
  },
  {
    imageScr: '/assets/besi2.jpeg', 
    imageAlt: 'natur2'
  },
  {
    imageScr: '/assets/besi3.jpeg', 
    imageAlt: 'natur3'
  }
];

 selectedIndex=0;
 indicators:boolean=true;
 autoSlide:boolean=true;
 slideInterval=3000;

 constructor(public dialog: MatDialog) {}

  ngOnInit(): void {  
    if(this.autoSlide){
      this.autoSlideImages();
    }  
  }

  autoSlideImages():void{
    setInterval(() =>{
        this.onNextClick();
      }, this.slideInterval);
  }
  
  onNextClick():void{
    if (this.selectedIndex===this.images.length - 1){
      this.selectedIndex=0
    }else{
      this.selectedIndex++;
    }
  }
  //set image dot indicator
  selectedImage(index:number):void{
    this.selectedIndex=index;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormUserLoginComponent, {
      width: '250px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

}



