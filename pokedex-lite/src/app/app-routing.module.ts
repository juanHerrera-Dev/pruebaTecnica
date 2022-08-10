import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogeduserGuard } from './guards/logeduser.guard';
import { LoginGuard } from './guards/loginguard.guard';
import { ModalComponent } from './modal/modal.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { EditPokemonComponent } from './vistas/edit-pokemon/edit-pokemon.component';
import { ErrorComponent } from './vistas/error/error.component';
import { LoginComponent } from './vistas/login/login.component';
import { NewPokemonComponent } from './vistas/new-pokemon/new-pokemon.component';


const appRoutes: Routes =[
    {path:'' , redirectTo:'login' , pathMatch:'full'},
    {path:'login', component: LoginComponent, canActivate:[LogeduserGuard]},
    {path:'dashboard', component: DashboardComponent, canActivate:[LoginGuard] },
    {path:'newPokemon/:id', component: NewPokemonComponent, canActivate:[LoginGuard]},
    {path:'editPokemon/:id', component: EditPokemonComponent, canActivate:[LoginGuard]},
    {path:'**', component: ErrorComponent}
    
  ];

@NgModule({
  imports: [ RouterModule.forRoot(
    appRoutes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }