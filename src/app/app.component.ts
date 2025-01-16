import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})



export class AppComponent implements OnInit {
 logon: boolean=false;
 showSolutions:boolean = false; 
 isOpen : boolean= false;
  ngOnInit(): void {  
    
  }

}