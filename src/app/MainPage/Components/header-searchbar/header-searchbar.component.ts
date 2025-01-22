import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface carouselImage{
  imageScr:String;
  imageAlt:String;
}

@Component({
  selector: 'app-header-searchbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-searchbar.component.html',
  styleUrls: ['./header-searchbar.component.css']
})



export class HeaderSearchbarComponent implements OnInit{

  selectedIndex=0;
  indicators:boolean=true;
  autoSlide:boolean=true;
  slideInterval=3000;

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
