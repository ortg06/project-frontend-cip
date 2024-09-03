import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MainHeaderComponent } from '../app-components/main-header/main-header.component';
import { MainSidebarComponent } from '../app-components/main-sidebar/main-sidebar.component';
import { ContentWrapperComponent } from '../app-components/content-wrapper/content-wrapper.component';
import { ControlSidebarComponent } from '../app-components/control-sidebar/control-sidebar.component';
import { MainFooterComponent } from '../app-components/main-footer/main-footer.component';
import { PreloaderComponent } from '../app-components/preloader/preloader.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PreEntrevistaComponent } from './formularios/pre-entrevista/pre-entrevista.component';
import { FichaAdultoComponent } from './formularios/ficha-adulto/ficha-adulto.component';
import { PersonasComponent } from './datatable/personas/personas.component';
import { PacientesComponent } from './datatable/pacientes/pacientes.component';

@NgModule({
    declarations: [
        PagesComponent,
        MainHeaderComponent,
        MainSidebarComponent,
        ContentWrapperComponent,
        ControlSidebarComponent,
        MainFooterComponent,
        PreloaderComponent,
        PreEntrevistaComponent,
        FichaAdultoComponent,
        PersonasComponent,
        PacientesComponent
    ],
    imports: [
        BrowserModule,
        PagesRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [PagesComponent]
})
export class PagesModule { }
