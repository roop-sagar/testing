import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  token:any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: Router,
    private tokenService: TokenService,

  ) {}
  validatesSignin!: FormGroup;

  ngOnInit(): void {
    this.validatesSignin = this.fb.group({
      email1: [null, [Validators.required]],
      password1: [null, [Validators.required]],
    });
  }
  submitSignin(data: any): void {
    // this.tokenService.getToken(data.email1,data.password1).subscribe({
    //   next: (token:any) => {
    //     this.token = token;
    //   }
    // })
    // console.log(this.token);

    const send = {
      email: data.email1,
      password: data.password1,
    };
    this.http
      .post<any>('http://localhost:5000/login', send,{
        observe: 'response',
        responseType: 'json',
      })
      .subscribe((res) => {
       localStorage.setItem('x-token',res.body.token);
      });

      this.token = localStorage.getItem('x-token');
    if(this.token){
    this.route.navigate(['dashboard']);
    }
  }
}
