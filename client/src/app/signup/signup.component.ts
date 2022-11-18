import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup, UntypedFormControl, ValidationErrors, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb:FormBuilder,private http:HttpClient){}
  validateForm1!: FormGroup;
  ngOnInit(): void {
    this.validateForm1 = this.fb.group({
      username1:[null,[Validators.required]],
      email1: [null, [Validators.required]],
      password1: [null, [Validators.required]],
    });
  }

  submitForm1(data: any): void {

    const send= {
      name: data.username1,
      email: data.email1,
      password: data.password1
    }
    this.http.post<any>('http://localhost:5000/send',send).subscribe();

      this.validateForm1 = this.fb.group({
        username1:[null],
        email1: [null],
        password1: [null],
      });
  }
}
