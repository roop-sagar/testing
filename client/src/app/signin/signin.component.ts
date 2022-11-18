import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb:FormBuilder,private http:HttpClient){}
  validatesSignin!: FormGroup;

  ngOnInit(): void {
    this.validatesSignin = this.fb.group({

      email1: [null, [Validators.required]],
      password1: [null, [Validators.required]],
    });
  }
  submitSignin(data: any): void {
    console.log(this.validatesSignin.value);

  }
}
