import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonI } from 'src/app/modelos/pokemon.interface';
import { EmitterService } from 'src/app/servicios/emitter.service';

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.css']
})
export class EditPokemonComponent implements OnInit {
  
  public load!: boolean;
  public pokemonToEdit!: PokemonI;

  constructor(private activerouter:ActivatedRoute, private router:Router, private emitter:EmitterService) { }

  ngOnInit(): void {
    this.emitter.dataEmitter.subscribe(data => {
      this.pokemonToEdit= data;
      this.load= true;
      console.log('pokemon recibido:',data);
      console.log('pokemon almacenado a espera',this.pokemonToEdit);
    });
    console.log('pokemon almacenado a inicio',this.pokemonToEdit);
    console.log(this.load);
    /*
    let pokemonid = this.activerouter.snapshot.paramMap.get('id');
    console.log(pokemonid);*/
  }
  
}
