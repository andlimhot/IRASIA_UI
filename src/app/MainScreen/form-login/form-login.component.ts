import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

interface carouselImage{
  imageScr:String;
  imageAlt:String;
}


@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
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

 


}