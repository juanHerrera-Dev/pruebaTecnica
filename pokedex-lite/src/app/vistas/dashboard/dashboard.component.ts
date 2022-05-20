import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ApiService } from 'src/app/servicios/api/api.service';

import { PokemonI } from 'src/app/modelos/pokemon.interface';

const isNotNull = (elem: any) => !!elem 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input()pokemonToEdit!: PokemonI;
  pokemons: PokemonI[] = [];

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.api.getAllPokemons().subscribe(data =>{
      
      this.pokemons = this.filterPokemons(data);
      
    })
  }
  editPokemon(id:number){
    
    this.router.navigate(['editPokemon', id]);
    

  }
  addNewPokemon(){
    this.router.navigate(['newPokemon']);
  }
  private filterPokemons(pokemons:PokemonI[]){

    return pokemons.filter(isNotNull);
  }
  
}

