import {  Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { PokemonI } from 'src/app/modelos/pokemon.interface';

import { ApiService } from 'src/app/servicios/api/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';



@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.css']
})
export class EditPokemonComponent implements OnInit {
  
   
   pokemonToEdit!: PokemonI;
   editForm: FormGroup = this.fb.group({
      id: [0,[Validators.required]],
      name: ["",[Validators.required]],
      lvl: [0,[Validators.required]],
      type: ["",[Validators.required]],//toString(),
      image: "",
      evolutionId: "",
      abilities: [{name: "",description: ""}]
   });

  constructor(private api:ApiService, 
    private activerouter:ActivatedRoute, 
    private router:Router, 
    private fb: FormBuilder,
    private modalService: NgbModal
    
    ) { 
    
  }

  ngOnInit(): void {
    this.initEditComponent();
  }

  setPokemon(data:any){
    
    this.pokemonToEdit = data;

    this.editForm = this.fb.group({
      id: [this.pokemonToEdit.id,[Validators.required]],
      name: [this.pokemonToEdit.name,[Validators.required]],
      lvl: [this.pokemonToEdit.lvl,[Validators.required]],
      type: [this.pokemonToEdit.type,[Validators.required]],
      image: this.pokemonToEdit.image,
      evolutionId: this.pokemonToEdit.evolutionId,
      abilities: this.pokemonToEdit.abilities
    });
    
  }

  postForm(form:FormGroup){
      
      form.patchValue({ type: [form.value.type.toString()]});
      form.patchValue({ abilities: [form.value.abilities]});
      
      //lo hago porque si se modifica el campo type se vuelve string y para el put necesito que sea un [string]
      //y en el caso del campo abilities por alguna razon al inicializarlo se transforma de [abilities] a abilities

      const modalRef = this.modalService.open(ModalComponent).result
      .then( (result) =>{
          
          this.api.putPokemon(form.value).subscribe((data: any) =>{
    
          form.patchValue({ type: form.value.type.toString()});
    
          this.router.navigate(['dashboard']);
    
          },(error: any) =>{
            console.log('error catcheado',error);

            const modalRef = this.modalService.open(ModalComponent);
            modalRef.componentInstance.confirmationModal= false;
            modalRef.componentInstance.message = "error in EditPokemon, error: " + error.message;
    
            form.patchValue({ type: form.value.type.toString()});
            
            //mostrar al usuario que hubo un error
          })
      },(reason) =>{/*por ahora no hace nada solo lo hice para agarrar el caso en que se cierra el modal */}
      );
       

      
  }
  initEditComponent():void{
    let userId= sessionStorage.getItem('userId');
    this.api.getAllPokemons(userId?userId:"").subscribe(data =>{
      
      let pokemonid = this.activerouter.snapshot.paramMap.get('id');
      
      let filteredPokemon= data.find(pokemon => (pokemon.id.toString()) === pokemonid );
      
      this.setPokemon(filteredPokemon);
      
    })
  }
  
  inputClass(inputName: string):string{

    if(this.editForm.get(inputName)?.touched && this.editForm.get(inputName)?.errors?.['required']){
      return 'border border-danger'
    }
    else{return ""}
  }
      
}
