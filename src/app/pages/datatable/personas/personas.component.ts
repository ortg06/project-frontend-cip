import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {ScriptService} from "../../../services/scripts.service";

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit{

  constructor(private renderer: Renderer2,
              private scriptService: ScriptService) {

  }
  ngOnInit(): void {
    this.scriptService.loadJsScript(this.renderer, '/assets/custom/js/datatable/personas.js');
  }

  ngOnDestroy(){
    window.location.reload();
  }

}
