import {Component, Renderer2} from '@angular/core';
import {ScriptService} from "../../../services/scripts.service";

@Component({
  selector: 'app-ficha-adulto',
  templateUrl: './ficha-adulto.component.html',
  styleUrls: ['./ficha-adulto.component.css']
})
export class FichaAdultoComponent {
  constructor(private renderer: Renderer2,
              private scriptService: ScriptService) {

  }
  ngOnInit(): void {
    this.scriptService.loadJsScript(this.renderer, '/assets/custom/js/formularios/pre-entrevista.js');
  }

  ngOnDestroy(){
    window.location.reload();
  }

}
