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

  pokemons: PokemonI[] = [];

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.initDashboard();
  }

  private initDashboard():void{
    this.api.getAllPokemons().subscribe(data =>{
      
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

