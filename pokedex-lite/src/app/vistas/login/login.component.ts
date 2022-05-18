import { Component, OnInit } from '@angular/core';

import { FormGroup,FormControl,Validators} from '@angular/forms';
import { LoginI } from 'src/app/modelos/login.interface';
import { ApiService } from '../../servicios/api/api.service'


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

  constructor( private api:ApiService) { }

  ngOnInit(): void {
  }
  onLogin(form: LoginI){
    
    this.api.loginByUser(form).subscribe(data =>{
      console.log(data);
    });
    
    //console.log(form)
  }
}
