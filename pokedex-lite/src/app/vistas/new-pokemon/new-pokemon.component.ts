import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PokemonI } from 'src/app/modelos/pokemon.interface';

@Component({
  selector: 'app-new-pokemon',
  templateUrl: './new-pokemon.component.html',
  styleUrls: ['./new-pokemon.component.css']
})
export class NewPokemonComponent implements OnInit {

  pokemonToCreate!: PokemonI;
  editForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        lvl: new FormControl(''),
        type: new FormControl(''),
        image: new FormControl(''),
        evolutionId: new FormControl(''),
        abilities: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  postForm(form:PokemonI){
    /*
    let newPokemon: NewPokemonI = {
      pokemon: form
    }
    this.api.postPokemon.(newPokemon).subscribe((data: any) =>{
      console.log(data);
      //this.router.navigate(['dashboard']);
    },(error) =>{
      console.log(error);
      //mostrar al usuario que hubo un error
    })
    //nada por ahora
    ya lo voy a hacer pero tengo problemas para ver como manejar lo que vuelve
    */
  }
}
