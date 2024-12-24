import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-user-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule ],
  templateUrl: './form-user-login.component.html',
  styleUrls: ['./form-user-login.component.css']
})
export class FormUserLoginComponent  implements OnInit{
  loginForm!: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    // Proses login di sini, misalnya:
    // this.authService.login(this.loginForm.value).subscribe(...)

    console.log(this.loginForm.value); 
  }
}