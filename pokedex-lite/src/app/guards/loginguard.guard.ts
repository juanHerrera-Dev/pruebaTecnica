import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(sessionStorage.getItem('userId')){
      return true;
    }
    else{
      this.router.navigate(['login']);
      return false;
    }
  }
  
}


/*
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.loginService.isLoged()){
            return true;
        }
        else{
            this.router.navigate(['login']);
            return false;
        }
    }
*/
