import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm!:FormGroup;
  hidePassword=true;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.signupForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  togglePasswordVisibility(): void {
    this.hidePassword=!this.hidePassword;
  }

  onSubmit(): void {
    console.log(this.signupForm.value);
    const password = (this.signupForm.value as FormControl).value;
    const confirmPassword = (this.signupForm.value as FormControl).value;
    if(password !== password) {
      this.snackBar.open("password dont match","Close",{duration:2000,panelClass:"error-snackbar"});
      return;
    }
    this.authService.signup(this.signupForm.value).subscribe((result) => {
      console.log(result);
      if (result.id != null) {
        this.snackBar.open("Signup successful","Close",{duration:2000});
      this.router.navigate(['/login']);
      }else {
        this.snackBar.open("Signup failed","Close",{duration:2000,panelClass:"error-snackbar"});
      }
    })
  }
}
