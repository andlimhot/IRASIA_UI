import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { regismdl } from '../../Models/regismdl';
import { RegisServiceService } from '../../Services/regis-service.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { provincemdl } from '../../Models/provincemdl';
import { citymdl } from '../../Models/citymdl';
import { kecamatanmdl } from '../../Models/kecamatanmdl';
import { kelurahanmdl } from '../../Models/kelurahanmdl';
import { bankmdl } from '../../Models/bankmdl';

interface Food {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, 
    MatCheckboxModule, MatInputModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
vreg : regismdl[]=[];
RegisForm: FormGroup;
nikimage?:File;
nibimage?:File;
message='';
preview='';
preview2='';
bankrcv:boolean=true;
maxapp:number=0;
vprov=new FormControl('');
vcity=new FormControl('');
vkec=new FormControl('');
vkel=new FormControl('');
selectedprov: string = 'a';
selectedcity: string = 'a';
selectedkec: string = 'a';
selectedkel: string = 'a';
selectedbank: string = 'a';
//optionsprov: string[] = [];
//filteredprov: Observable<string[]>;
//optionscity: string[] = [];
//filteredcity: Observable<string[]>;
//optionskec: string[] = [];
//optionskel: string[] = [];
provlist:provincemdl[]=[];
citylist:citymdl[]=[];
keclist:kecamatanmdl[]=[];
kellist:kelurahanmdl[]=[];
banklist:bankmdl[]=[];

foods: Food[] = [
  {value: 'steak-0', viewValue: 'Steak'},
  {value: 'pizza-1', viewValue: 'Pizza'},
  {value: 'tacos-2', viewValue: 'Tacos'},
];

constructor(private regiServ : RegisServiceService, private formBuider: FormBuilder){
  this.RegisForm = this.formBuider.group({
    ccregId: '',
    ccregName: '',
    ccregNickName: '',
    ccregNationId: '',
    ccregNationImgFileName: '',
    ccregNationImgFilePath: '',
    ccregNibId: '',
    ccregNibImgFileName: '',
    ccregNibImgFilePath: '',
    ccregAddress: '',
    ccregRt: '',
    ccregRw: '',
    ccregProvId: '',
    ccregCityId: '',
    ccregKecId: '',
    ccregKelId: '',
    ccregArea: '',
    ccregZip:'',
    ccregMobilePhone: '',
    ccregPhone: '',
    ccregEmail: '',
    ccregLongLat: '',
    ccregSentCmbaId: '',
    ccregSentCmbaName: '',
    ccregSentCmbaAccount: '',
    ccregRevcCmbaId: '',
    ccregRecvCmbaName: '',
    ccregRevcCmbaAccount: '',
    ccregMinApproval: '',
    ccregPic1Name: '',
    ccregPic1Phone: '',
    ccregPic1Email: '',
    ccregPic1password: '',
    ccregPic2Name: '',
    ccregPic2Phone: '',
    ccregPic2Email: '',
    ccregPic2password: '',
    ccregPic3Name: '',
    ccregPic3Phone: '',
    ccregPic3Email: '',
    ccregPic3password: '',
  })
}

ngOnInit(): void {
  this.getprovince();
  throw new Error('Method not implement');
}

changebank(value: any) {
  this.selectedbank = value;
}

getbank() {
  this.banklist = [];  
  this.regiServ.getBankALL().subscribe((res: bankmdl[]) => {
    this.banklist = res;   
  });
}

changeprov(value: any) {
  this.citylist=[];
  this.keclist = [];  
  this.kellist = [];  
  this.selectedprov = value;
  this.getcity(this.selectedprov);
}

getprovince() {
  this.provlist = [];
  this.regiServ.getProvinceALL().subscribe((res: provincemdl[]) => {
    this.provlist = res;   
    console.log(this.provlist.length);
  });
}

changecity(value: any) {
  this.keclist = [];  
  this.kellist = [];  
  this.selectedcity = value;
  this.getkecamatan(this.selectedcity);
}

getcity(ct:string) {
  this.citylist = [];
  this.regiServ.getcitybyprovALL(ct).subscribe((res: citymdl[]) => {
    this.citylist = res;   
  });
}

changekecamatan(value: any) {
  this.kellist = [];  
  this.selectedkec = value;
  this.getkelurahan( this.selectedkec);
}

getkecamatan(kc:string) {
  this.kellist = [];  
  this.regiServ.getKecbyCityALL(kc).subscribe((res: kecamatanmdl[]) => {
    this.keclist = res;   
  });
}

changekelurahan(value: any) {
  this.selectedkel = value;
}

getkelurahan(kl:string) {
  this.kellist = [];  
  this.regiServ.getKelbyKecALL(kl).subscribe((res: kelurahanmdl[]) => {
    this.kellist = res;   
  });
}



saveRegis(){
  this.regiServ.saveupdateRegis(this.RegisForm.value).subscribe({
    next: (val: any) => {
      alert(val);
      //  alert('saveeee')
    },
    error: (err: any) => {
      console.log(err);
    }
  });
}

selectImageNik(event : any){
  this.message='';
  this.preview='';
  const selectedNik = event.target.files;

  if (selectedNik){
    const nik:File | null =selectedNik.item(0);
    if (nik){
      this.preview='';
      this.nikimage=nik;

      const reader = new FileReader();

      reader.onload=(e:any) => {
        console.log(e.target.result);
        this.preview=e.target.result;
      };

      reader.readAsDataURL(this.nikimage);
    }
  }

}

selectImageNib(event : any){
  this.message='';
  this.preview2='';
  const selectedNib = event.target.files;

  if (selectedNib){
    const nib:File | null =selectedNib.item(0);
    if (nib){
      this.preview2='';
      this.nibimage=nib;

      const reader = new FileReader();

      reader.onload=(e:any) => {
        console.log(e.target.result);
        this.preview2=e.target.result;
      };

      reader.readAsDataURL(this.nibimage);
    }
  }
}

showSentBank(){
  if (this.bankrcv===true){
    this.bankrcv=false;
  }else{
    this.bankrcv=true;
  };
}

maxpic(ob:any) {
  console.log(ob.value);
 
}

}
