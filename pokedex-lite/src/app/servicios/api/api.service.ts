import { Injectable } from '@angular/core';

import { LoginI } from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';

import { PokemonI } from '../../modelos/pokemon.interface'

import { HttpClient , HttpHeaders} from '@angular/common/http'
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "https://cors-anywhere.herokuapp.com/https://testing.certant.com/pokedex-api/";

  constructor(private http:HttpClient) { }

  loginByUser(form:LoginI):Observable<ResponseI>{
    
    let direccion = this.url + "login";
    let errorResponse: ResponseI = {userId: "0",username:""};

    return this.http.post<ResponseI>(direccion,form)
                   .pipe(
                     catchError(this.handleError<ResponseI>(errorResponse))
                   );
  }

  getAllPokemons():Observable<PokemonI[]>{
    let direccion = this.url + "pokemon?userId=" + localStorage.getItem('userId');
    return this.http.get<PokemonI[]>(direccion);
  }

  private handleError<T>( result?: T) {
    return (error: any): Observable<T> => {
      
      return of(result as T);
    };
  }
}
