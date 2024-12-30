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

interface Food {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, FormsModule
  ],
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
  throw new Error('Method not implement');
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

}
