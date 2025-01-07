import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {ScriptService} from "../../../services/scripts.service";

@Component({
  selector: 'app-pre-entrevista-reingreso',
  templateUrl: './pre-entrevista-reingreso.component.html',
  styleUrls: ['./pre-entrevista-reingreso.component.css']
})
export class PreEntrevistaReingresoComponent  implements OnInit{

  constructor(private renderer: Renderer2,
              private scriptService: ScriptService) {

  }
  ngOnInit(): void {
    this.scriptService.loadJsScript(this.renderer, '/assets/custom/js/formularios/pre-entrevista-reingreso.js');
  }

  ngOnDestroy(){
    window.location.reload();
  }

}
