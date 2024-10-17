import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StorageService} from "../../services/storage/storage.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword = true;
  isAdminLoggedIn: boolean;
  isCustomerLoggedIn: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackbar: MatSnackBar,
              private router: Router) {
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();

    if (this.isAdminLoggedIn) {
      this.router.navigateByUrl("/admin/dashboard");
    } else if (this.isCustomerLoggedIn) {
      this.router.navigateByUrl("/customer/dashboard");
    }

    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((result) => {
      console.log(result);
      if (result.userId != null) {
        const user = {
          id: result.userId,
          role: result.userRole
        }
        StorageService.saveUser(user);
        StorageService.saveToken(result.jwt);

        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl("/admin/dashboard");
        } else if (StorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl("/customer/dashboard");
        }

        this.snackbar.open("Giriş Başarılı", "Close", { duration: 2000 });
      } else {
        this.snackbar.open("Login failed!", "Close", { duration: 2000, panelClass: "error-snackbar" });
      }
    })
  }
}
