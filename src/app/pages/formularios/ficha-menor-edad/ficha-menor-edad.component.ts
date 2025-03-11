import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {ScriptService} from "../../../services/scripts.service";
import {ActivatedRoute} from "@angular/router";
import Stepper from "bs-stepper";

@Component({
  selector: 'app-ficha-menor-edad',
  templateUrl: './ficha-menor-edad.component.html',
  styleUrls: ['./ficha-menor-edad.component.css']
})
export class FichaMenorEdadComponent {
  codigoPersona: string | null = '';
  accion: string | null = '';

  constructor(private renderer: Renderer2,
              private scriptService: ScriptService,private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.scriptService.loadJsScript(this.renderer, '/assets/custom/js/formularios/ficha-menor-edad.js');

    // Obtener el valor del parámetro de la URL
    this.route.paramMap.subscribe(params => {
      this.codigoPersona = params.get('codigoPersona');
      this.accion = params.get('accion');

      // Asigna el valor al input oculto
      const inputElement = document.getElementById('codigoPersona') as HTMLInputElement;
      const inputElement2 = document.getElementById('accion') as HTMLInputElement;
      if (typeof this.codigoPersona === "string") {
        inputElement.value = this.codigoPersona;
      }
      if (typeof this.accion === "string") {
        inputElement2.value = this.accion;
      }
    });
  }

  ngOnDestroy(){
    window.location.reload();
  }

  @ViewChild('stepper') stepperElement!: ElementRef;
  @ViewChild('nextButton') nextButton!: ElementRef;
  @ViewChild('previousButton') previousButton!: ElementRef;

  stepper!: Stepper;

  ngAfterViewInit(): void {
    const stepperNativeElement = this.stepperElement.nativeElement;
    if (stepperNativeElement) {
      this.stepper = new Stepper(stepperNativeElement, {
        // Opciones opcionales, si las necesitas
      });

      const nextButtonElement = this.nextButton.nativeElement;
      const previousButtonElement = this.previousButton.nativeElement;

      /* if (nextButtonElement) {
         nextButtonElement.addEventListener('click', () => {
           this.stepper.next();
         });
       }

       if (previousButtonElement) {
         previousButtonElement.addEventListener('click', () => {
           this.stepper.previous();
         });
       }*/
    } else {
      console.error('Stepper element not found');
    }
  }


}
