import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    
    this.checkLocalStorage();
    /*lo hago porque como el componente header esta en todas las views(dashboard,newPokemon,editPokemon)
    me aseguro de proteger las rutas si no hay un usuario logeado y navego al login
    */
  }

  checkLocalStorage(){
    if(!localStorage.getItem('userId')){
      this.router.navigate(['login']);
    }
  }

  logOutUser(){
    localStorage.removeItem('userId');
    this.router.navigate(['login']);
  }
}
