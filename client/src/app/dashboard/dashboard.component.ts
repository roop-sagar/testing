import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
  token:any;
  constructor(private http:HttpClient,private router:Router) { }


  ngOnInit(): void {
    this.token = localStorage.getItem('x-token');

    if(!this.token){
    this.router.navigate(['signin']);
    }
  }

}
