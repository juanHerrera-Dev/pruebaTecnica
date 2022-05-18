import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmitterService } from 'src/app/servicios/emitter.service';
import { ApiService } from 'src/app/servicios/api/api.service';

import { PokemonI } from 'src/app/modelos/pokemon.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input()pokemonToEdit!: PokemonI;
  pokemons: PokemonI[] = [];

  constructor(private api:ApiService, private router:Router, private emitter:EmitterService) { }

  ngOnInit(): void {
    this.api.getAllPokemons().subscribe(data =>{
      console.log(data);
    this.pokemons=data
    })
  }
  editPokemon(id:number,pokemon:PokemonI){
    
    this.emitter.dataEmitter.emit(pokemon);
    this.router.navigate(['editPokemon', id]);
  }
  addNewPokemon(){
    this.router.navigate(['newPokemon']);
  }

}
