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
    return this.http.post<ResponseI>(this.url + "login", form);
  }

  getAllPokemons(userId: string):Observable<PokemonI[]>{
    return this.http.get<PokemonI[]>(this.url + "pokemon?userId=" + userId);
  }
  
  putPokemon(form:PokemonI){
    return this.http.put(this.url + "pokemon", form);               
  } 

  postPokemon(form:NewPokemonI){
    return this.http.post(this.url + "pokemon", form);               
  } 
  /*
  private handleError<T>( result?: T) {
    return (error: any): Observable<T> => {
      
      return of(result as T);
    };
  }*/
}
