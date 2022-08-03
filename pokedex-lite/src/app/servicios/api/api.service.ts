import { Injectable } from '@angular/core';

import { LoginI } from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';

import { PokemonI } from '../../modelos/pokemon.interface'

import { HttpClient } from '@angular/common/http'
import { catchError, Observable, of } from 'rxjs';
import { NewPokemonI } from 'src/app/modelos/new-pokemon';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "/pokedex-api/";
  //url2:string = "https://cors-anywhere.herokuapp.com/https://testing.certant.com/pokedex-api/";

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
  
  putPokemon(form:PokemonI){
    let direccion = this.url + "pokemon";

    return this.http.put(direccion,form)
                   .pipe(
                     catchError(this.handleError())
                   );
  } 

  postPokemon(form:NewPokemonI){
    let direccion = this.url + "pokemon";

    return this.http.post(direccion,form)
                   .pipe(
                     catchError(this.handleError())
                   );
  } 

  private handleError<T>( result?: T) {
    return (error: any): Observable<T> => {
      
      return of(result as T);
    };
  }
}
