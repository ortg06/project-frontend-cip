import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PagesComponent } from "./pages.component";
import {FichaAdultoComponent} from "./formularios/ficha-adulto/ficha-adulto.component";
import {PreEntrevistaComponent} from "./formularios/pre-entrevista/pre-entrevista.component";
import {PersonasComponent} from "./datatable/personas/personas.component";
import {PacientesComponent} from "./datatable/pacientes/pacientes.component";
import {FichaMenorEdadComponent} from "./formularios/ficha-menor-edad/ficha-menor-edad.component";
import {
  PreEntrevistaReingresoComponent
} from "./formularios/pre-entrevista-reingreso/pre-entrevista-reingreso.component";


const routes: Routes = [
    {
      path: "", component: PagesComponent,
      children: [
        {
          path: 'home',
          component: HomeComponent,
          pathMatch: 'full'
        },
        {
          path: 'formularios/fichaAdulto',
          component: FichaAdultoComponent,
          pathMatch: 'full'
        },
        {
          path: 'formularios/preEntrevista',
          component: PreEntrevistaComponent,
          pathMatch: 'full'
        },
        {
          path: 'personas-inscritas',
          component: PersonasComponent,
          pathMatch: 'full'
        },
        {
          path: 'pacientes',
          component: PacientesComponent,
          pathMatch: 'full'
        },
        {
          path: 'pacientes/registrar',
          component: FichaAdultoComponent,
          pathMatch: 'full'
        },
        {
          path: 'pacientes/:accion/:codigoPersona',
          component: FichaAdultoComponent,
          pathMatch: 'full'
        },
        {
          path: 'pacientes/:accion/:codigoPersona',
          component: FichaAdultoComponent,
          pathMatch: 'full'
        },
        {
          path: 'formularios/fichaMenorEdad',
          component: FichaMenorEdadComponent,
          pathMatch: 'full'
        },
        {
          path: 'formularios/preEntrevistaReingreso',
          component: PreEntrevistaReingresoComponent,
          pathMatch: 'full'
        }
      ]
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
