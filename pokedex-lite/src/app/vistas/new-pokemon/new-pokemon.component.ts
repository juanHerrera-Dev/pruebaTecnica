import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NewPokemonI } from 'src/app/modelos/new-pokemon';
import { PokemonI } from 'src/app/modelos/pokemon.interface';

import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-new-pokemon',
  templateUrl: './new-pokemon.component.html',
  styleUrls: ['./new-pokemon.component.css']
})
export class NewPokemonComponent implements OnInit {

  pokemonToCreate!: PokemonI;
  newForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        lvl: new FormControl(''),
        type: new FormControl(''),
        image: new FormControl(''),
        evolutionId: new FormControl(''),
        abilities: new FormControl('')
  });

  constructor(private api:ApiService, private activerouter:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  }

  postForm(form:FormGroup){
    
    
    form.patchValue({ evolutionId: Number(form.value.evolutionId)});
    form.patchValue({ lvl: Number(form.value.lvl)});
    form.patchValue({ id: Number(form.value.id)});
    form.patchValue({ type: [form.value.type]});
    form.patchValue({ abilities: [form.value.abilities]});

    
    let newPokemon: NewPokemonI = {
      pokemon: form.value,
      userId: localStorage.getItem("userId")!
    }
    this.api.postPokemon(newPokemon).subscribe((data: any) =>{

      form.patchValue({ evolutionId: form.value.evolutionId.toString()});
      form.patchValue({ lvl: form.value.lvl.toString()});
      form.patchValue({ id: form.value.id.toString()});
      form.patchValue({ type: form.value.type.toString()});
      form.patchValue({ abilities: form.value.abilities.toString()});
      this.router.navigate(['dashboard']);

    },(error: any) =>{
      console.log('error catcheado',error);

      form.patchValue({ evolutionId: form.value.evolutionId.toString()});
      form.patchValue({ lvl: form.value.lvl.toString()});
      form.patchValue({ id: form.value.id.toString()});
      form.patchValue({ type: form.value.type.toString()});
      form.patchValue({ abilities: form.value.abilities.toString()});
    })
  }
     
}
