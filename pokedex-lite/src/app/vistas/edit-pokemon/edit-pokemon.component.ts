import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';

import { PokemonI } from 'src/app/modelos/pokemon.interface';
import { EmitterService } from 'src/app/servicios/emitter.service';
import { ApiService } from 'src/app/servicios/api/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.css']
})
export class EditPokemonComponent implements OnInit {
  
   load!: boolean;
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

  constructor(private api:ApiService, private activerouter:ActivatedRoute, private router:Router, private emitter:EmitterService) { }

  ngOnInit(): void {
    this.emitter.dataEmitter.subscribe(data => {
      this.pokemonToEdit= data;
      this.load= true;
      this.editForm.setValue({
        'id': this.pokemonToEdit.id,
        'name': this.pokemonToEdit.name,
        'lvl': this.pokemonToEdit.lvl,
        'type': this.pokemonToEdit.type,
        'image': this.pokemonToEdit.image,
        'evolutionId': this.pokemonToEdit.evolutionId,
        'abilities': this.pokemonToEdit.abilities,
      })
      console.log('formulario a enviar:',this.editForm.value);
      console.log('pokemon recibido:',data);
      console.log('pokemon almacenado a espera',this.pokemonToEdit);
      console.log('this es dentro de ngOnInit:',this)
    });
    console.log('this es:',this)
    console.log('pokemon almacenado a inicio',this.pokemonToEdit);
    console.log(this.load);
    /*
    let pokemonid = this.activerouter.snapshot.paramMap.get('id');
    console.log(pokemonid);*/
  }

  postForm(form:PokemonI){
      /*
      this.api.putPokemon.(form).subscribe((data: any) =>{
        console.log(data);
        //this.router.navigate(['dashboard']);
      })
      //nada por ahora
      ya lo voy a hacer pero tengo problemas para ver como manejar lo que vuelve
      */
  }
  
}
