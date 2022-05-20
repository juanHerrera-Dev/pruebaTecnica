import {  Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl } from '@angular/forms';

import { PokemonI } from 'src/app/modelos/pokemon.interface';

import { ApiService } from 'src/app/servicios/api/api.service';


@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.css']
})
export class EditPokemonComponent implements OnInit {
  
   
   pokemonToEdit!: PokemonI;
   editForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      lvl: new FormControl(''),
      type: new FormControl(''),
      image: new FormControl(''),
      evolutionId: new FormControl(''),
      abilities: new FormControl('')
  });

  

  constructor(private api:ApiService, private activerouter:ActivatedRoute, private router:Router) { 

    
  }

  ngOnInit(): void {
    
    this.api.getAllPokemons().subscribe(data =>{
      
      let pokemonid = this.activerouter.snapshot.paramMap.get('id');
      
      let filteredPokemon= data.find(pokemon => (pokemon.id.toString()) === pokemonid );
      
      this.setPokemon(filteredPokemon);
      
    })
  
  }
  setPokemon(data:any){
    
    this.pokemonToEdit = data;
    
    this.editForm.setValue({
      'id': this.pokemonToEdit.id,
      'name': this.pokemonToEdit.name,
      'lvl': this.pokemonToEdit.lvl.toString(),
      'type': this.pokemonToEdit.type.toString(),
      'image': this.pokemonToEdit.image,
      'evolutionId': this.pokemonToEdit.evolutionId,
      'abilities': this.pokemonToEdit.abilities,
    });

  }

  postForm(form:FormGroup){
      
      form.patchValue({ lvl:  Number(form.value.lvl)});
      form.patchValue({ type: [form.value.type]});
      // cambio el tipo del pokemon de string a array para poder hacer el put correctamente

      this.api.putPokemon(form.value).subscribe((data: any) =>{

        
        form.patchValue({ type: form.value.type.toString()});
        form.patchValue({ lvl: form.value.lvl.toString()});

        this.router.navigate(['dashboard']);

      },(error: any) =>{
        console.log('error catcheado',error);

        form.patchValue({ type: form.value.type.toString()});
        form.patchValue({ lvl: form.value.lvl.toString()});
        //mostrar al usuario que hubo un error
      })

  }
      
      
}
