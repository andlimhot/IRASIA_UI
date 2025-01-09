import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
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
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

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
export class RegistrationComponent implements OnInit,AfterViewInit  {
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
regid:number=0;
nikimg:string="a";
nibimg:string="a";
vregid:number=0;
to: string = '';
subject: string = '';
otp: string = '';
filepathnamenik:string='';
filepathnamenib:string='';

selectedFilenik: File | null = null;
selectedFilenib: File | null = null;
dirname: string = '';
uploadProgress: number | null = null;
uploadMessage: string | null = null;
@ViewChild('iconList') iconList!: ElementRef;
icons = [
  'home', 'search', 'favorite', 'settings', 'person', 'info', 
  'help', 'event', 'work', 'school', 'local_cafe', 'restaurant',
  // ... tambahkan ikon lainnya sesuai kebutuhan
];

constructor(private regiServ : RegisServiceService, private formBuider: FormBuilder, private http: HttpClient){
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
    ccreg_type:'',
    ccreg_password:''
  })
}

ngAfterViewInit() {
  const iconElements = this.iconList.nativeElement.querySelectorAll('.icon'); // Perbaikan di sini
    let totalWidth = 0;
    
    // Hitung lebar total 5 ikon pertama
    for (let i = 0; i < 5 && i < iconElements.length; i++) {
      totalWidth += iconElements[i].offsetWidth; 
    }

    // Atur lebar `icon-list` sesuai total lebar 5 ikon
    this.iconList.nativeElement.style.width = `${totalWidth}px`;
  }
ngOnInit(): void {
  this.getprovince();
  this.getRegId();
  throw new Error('Method not implement');
}

changebank(value: any) {
  this.selectedbank = value;
}
/*
getbank() {
  this.banklist = [];  
  this.regiServ.getBankALL().subscribe((res: bankmdl[]) => {
    this.banklist = res;   
  });
}
*/
getRegId() {

  this.regiServ.getRegId().subscribe((res: any) => {
    this.vregid = res;   
    
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

sendEmail() {
  this.http.get<string>(`/reg/send-email?to=${this.to}&subject=${this.subject}`)
    .subscribe(
      response => {
        this.otp = response;
        console.log('OTP received:', this.otp);
        // You can now use this OTP for further actions, e.g., display it to the user
      },
      error => {
        console.error('Error sending email:', error);
        // Handle the error appropriately, e.g., display an error message to the user
      }
    );
}


saveRegis(){
  this.filepathnamenik="D:\\iasia\\UI\\IMAGES\\REGISTRATIONS\\"+this.vregid.toString()+"\\"+this.nikimg;
  this.filepathnamenib="D:\\iasia\\UI\\IMAGES\\REGISTRATIONS\\"+this.vregid.toString()+"\\"+this.nibimg;

    this.RegisForm.patchValue({
    ccregId: this.vregid,

    ccregNationImgFileName:  this.nikimg,
    ccregNibImgFileName:  this.nibimg,
    ccregNationImgFilePath:this.filepathnamenik,
    ccregNibImgFilePath:this.filepathnamenib
  });

  this.regiServ.saveupdateRegis(this.RegisForm.value).subscribe({
    next: (val: any) => {
      alert(val);
      //  alert('saveeee')
      this.onUpload();
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
  this.selectedFilenik = event.target.files[0] as File;
  if (selectedNik){
    const nik:File | null =selectedNik.item(0);
    if (nik){
      this.preview='';
      this.nikimage=nik;
      this.nikimg=this.nikimage.name;
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
  alert("aaaaaa");
  this.selectedFilenib = event.target.files[0] as File;
  if (selectedNib){
    const nib:File | null =selectedNib.item(0);
    if (nib){
      this.preview2='';
      this.nibimage=nib;
      this.nibimg=this.nibimage.name;
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




onUpload(): void {
  if (!this.selectedFilenik) {
    this.uploadMessage = 'Please select a file and enter a directory name.';
    return;
  }

  if (!this.selectedFilenib) {
    this.uploadMessage = 'Please select a file and enter a directory name.';
    return;
  }

  this.uploadProgress = 0;
  this.uploadMessage = null;

  const formData = new FormData();
  formData.append('file', this.selectedFilenik);
  formData.append('dirname', this.vregid.toString());

  this.http.post('http://localhost:8091/wc-svc/file/RegisUpload', formData, {
    reportProgress: true,
    observe: 'events'
  }).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      this.uploadProgress = Math.round(100 * event.loaded / event.total!);
    } else if (event instanceof HttpResponse) {
      this.uploadMessage = event.body as string;
      this.selectedFilenik = null;
      this.dirname = '';
      this.uploadProgress = null;
    }
  }, error => {
    this.uploadMessage = 'Upload failed: ' + error.message;
    this.uploadProgress = null;
  });

  this.uploadProgress = 0;
  this.uploadMessage = null;

  const formData2 = new FormData();
  formData2.append('file', this.selectedFilenib);
  formData2.append('dirname', this.vregid.toString());

  this.http.post('http://localhost:8091/wc-svc/file/RegisUpload', formData2, {
    reportProgress: true,
    observe: 'events'
  }).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      this.uploadProgress = Math.round(100 * event.loaded / event.total!);
    } else if (event instanceof HttpResponse) {
      this.uploadMessage = event.body as string;
      this.selectedFilenib = null;
      this.dirname = '';
      this.uploadProgress = null;
    }
  }, error => {
    this.uploadMessage = 'Upload failed: ' + error.message;
    this.uploadProgress = null;
  });
}
}


