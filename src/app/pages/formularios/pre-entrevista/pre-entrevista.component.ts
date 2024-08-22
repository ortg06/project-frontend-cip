import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import Stepper from "bs-stepper";
import {ScriptService} from "../../../services/scripts.service";

@Component({
  selector: 'app-pre-entrevista',
  templateUrl: './pre-entrevista.component.html',
  styleUrls: ['./pre-entrevista.component.css']
})
export class PreEntrevistaComponent implements AfterViewInit,OnInit{


  @ViewChild('stepper') stepperElement!: ElementRef;
  @ViewChild('nextButton') nextButton!: ElementRef;
  @ViewChild('previousButton') previousButton!: ElementRef;

  stepper!: Stepper;

  constructor(private renderer: Renderer2,
              private scriptService: ScriptService) {

  }
  ngOnInit(): void {
    this.scriptService.loadJsScript(this.renderer, '/assets/custom/js/formularios/pre-entrevista.js');
  }

  ngOnDestroy(){
    window.location.reload();
  }

  ngAfterViewInit(): void {
    const stepperNativeElement = this.stepperElement.nativeElement;
    if (stepperNativeElement) {
      this.stepper = new Stepper(stepperNativeElement, {
        // Opciones opcionales, si las necesitas
      });

      const nextButtonElement = this.nextButton.nativeElement;
      const previousButtonElement = this.previousButton.nativeElement;

      if (nextButtonElement) {
        nextButtonElement.addEventListener('click', () => {
          this.stepper.next();
        });
      }

      if (previousButtonElement) {
        previousButtonElement.addEventListener('click', () => {
          this.stepper.previous();
        });
      }
    } else {
      console.error('Stepper element not found');
    }
  }

}
