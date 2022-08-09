import { Component, OnInit } from '@angular/core';

import { FormGroup,FormControl,Validators} from '@angular/forms';
import { LoginI } from 'src/app/modelos/login.interface';
import { ApiService } from '../../servicios/api/api.service'
import { ResponseI } from '../../modelos/response.interface';

import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';



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
  constructor( private api:ApiService, private router:Router, private modalService: NgbModal ) { }

  ngOnInit(): void {
    
  }

  onLogin(form: LoginI){
    
    this.api.loginByUser(form).subscribe(data =>{
      
      sessionStorage.setItem('userId', data.userId);
      sessionStorage.setItem('userName', data.username);
      this.invalidUser = false;
      this.router.navigate(['dashboard']);
      
    }, error => {
      this.invalidUser = true;

      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.confirmationModal= false;
      modalRef.componentInstance.message = "error in Login, error: " + error.message;
    });
  }
}
