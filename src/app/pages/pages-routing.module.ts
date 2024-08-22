import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PagesComponent } from "./pages.component";
import {FichaAdultoComponent} from "./formularios/ficha-adulto/ficha-adulto.component";
import {PreEntrevistaComponent} from "./formularios/pre-entrevista/pre-entrevista.component";


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
        }
      ]
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
