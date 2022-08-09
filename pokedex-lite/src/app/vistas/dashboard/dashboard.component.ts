import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/servicios/api/api.service';

import { PokemonI } from 'src/app/modelos/pokemon.interface';

const isNotNull = (elem: any) => !!elem 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  userName: any;
  pokemons: PokemonI[] = [];

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.initDashboard();
  }
  
  deletePokemon(pokemon: PokemonI):void{
    console.log(pokemon);
  }

  private initDashboard():void{
    this.userName = sessionStorage.getItem('userName');

    var userId= sessionStorage.getItem('userId');
    
    this.api.getAllPokemons(userId?userId:"").subscribe(data =>{
      this.pokemons = this.filterPokemons(data);
    },error => {
      console.log("se produjo un error al cargar el dashboard" + error.message)
    }
    )
  }

  private filterPokemons(pokemons:PokemonI[]){
    return pokemons.filter(isNotNull);
  }
}

