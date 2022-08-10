import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';

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
        id: new FormControl(this.activerouter.snapshot.paramMap.get('id')),
        name: new FormControl(''),
        lvl: new FormControl(''),
        type: new FormControl(''),
        image: new FormControl(''),
        evolutionId: new FormControl(''),
        abilities: new FormControl(''),
        description: new FormControl('')
  });

  constructor(private api:ApiService, 
              private router:Router, 
              private modalService: NgbModal,
              private activerouter:ActivatedRoute,
            ) { }

  ngOnInit(): void {
  }

  postForm(form:FormGroup){
    
    const modalRef = this.modalService.open(ModalComponent).result
    .then((result) => {

          let abilities = {
            name: form.value.abilities,
            description: form.value.description
          }
          
          let newPokemon: NewPokemonI = {
            pokemon: {
              id: Number(form.value.id),
              name: form.value.name,
              lvl: Number(form.value.lvl),
              evolutionId: Number(form.value.evolutionId),
              abilities: [
                abilities
              ],
              type: [
                form.value.type
              ],
              image: form.value.image
            },
            userId: sessionStorage.getItem("userId")!
          }
          
          this.api.postPokemon(newPokemon).subscribe((data: any) =>{
              this.router.navigate(['dashboard']);
          },(error: any) =>{
            console.log('error catcheado' + error);
          })
          },(reason) =>{/*por ahora no hace nada solo lo hice para agarrar el caso en que se cierra el modal */}
    )
  }  
}
