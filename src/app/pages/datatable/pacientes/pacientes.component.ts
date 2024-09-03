import {Component, OnInit, Renderer2} from '@angular/core';
import {ScriptService} from "../../../services/scripts.service";

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent  implements OnInit{

  constructor(private renderer: Renderer2,
              private scriptService: ScriptService) {

  }
  ngOnInit(): void {
    this.scriptService.loadJsScript(this.renderer, '/assets/custom/js/datatable/pacientes.js');
  }

  ngOnDestroy(){
    window.location.reload();
  }

}
