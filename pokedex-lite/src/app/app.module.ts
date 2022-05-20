import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { LoginComponent } from './vistas/login/login.component';
import { NewPokemonComponent } from './vistas/new-pokemon/new-pokemon.component';
import { EditPokemonComponent } from './vistas/edit-pokemon/edit-pokemon.component';


const appRoutes: Routes =[
  {path:'' , redirectTo:'login' , pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'newPokemon', component: NewPokemonComponent},
  {path:'editPokemon/:id', component: EditPokemonComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    NewPokemonComponent,
    EditPokemonComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
