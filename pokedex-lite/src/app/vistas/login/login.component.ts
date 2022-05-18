import { Component, OnInit } from '@angular/core';

import { FormGroup,FormControl,Validators} from '@angular/forms';
import { LoginI } from 'src/app/modelos/login.interface';
import { ApiService } from '../../servicios/api/api.service'
import { ResponseI } from '../../modelos/response.interface';

import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  loginForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  //userId!: string;
  invalidUser: boolean = false;
  errorMsj: string = "";
  constructor( private api:ApiService, private router:Router ) { }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('userId')){
      this.router.navigate(['dashboard']);
    }
  }

  onLogin(form: LoginI){
    
    this.api.loginByUser(form).subscribe(data =>{
      let dataResponse: ResponseI = data;
      
      if(dataResponse.userId !== "0" ){
        localStorage.setItem('userId',dataResponse.userId);//lo guardo como si fuera un token
        //this.userId= dataResponse.userId;
        this.router.navigate(['dashboard']);
        this.invalidUser = false;
      }
      else{
        this.invalidUser = true;
        this.errorMsj = "invalid username or password";
      }
    });
  }


}
