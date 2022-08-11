import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  newForm!:FormGroup;
  
  constructor(private api:ApiService, 
              private router:Router, 
              private modalService: NgbModal,
              private activerouter:ActivatedRoute,
              private fb: FormBuilder,
            ) { }

  ngOnInit(): void {
    this.initForm();
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
  private initForm():void{
    this.newForm = this.fb.group({
      id: this.activerouter.snapshot.paramMap.get('id'),
      name: ["",[Validators.required]],
      lvl: [0,[Validators.required]],
      type:["",[Validators.required]],
      image: "",
      evolutionId: 0,
      abilities: ["",[Validators.required]],
      description: ["",[Validators.required]]
    });
  }
}
