import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {environment} from "../../../../environment/environment.prod";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedFile: File | null = null;
  uploadStatus: string | null = null;

  constructor(private http: HttpClient,
              private snackbar: MatSnackBar) {}

  ngOnInit(): void {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post(environment.apiUrl+'api/motors/add-with-excel', formData).subscribe(
        (response) => {
          this.snackbar.open("Dosya başarıyla yüklendi!", "Kapat", { duration: 2000 });
        },
        (error) => {
          this.snackbar.open("Dosya başarıyla yüklenemedi!", "Kapat", { duration: 2000 });
          console.error('Dosya yükleme hatası:', error);
        }
      );
    } else {
      this.snackbar.open("Lütfen bir dosya seçin!", "Kapat", { duration: 2000 });
    }
  }



}
