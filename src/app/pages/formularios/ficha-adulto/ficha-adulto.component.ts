import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ScriptService} from "../../../services/scripts.service";
import Stepper from "bs-stepper";

@Component({
  selector: 'app-ficha-adulto',
  templateUrl: './ficha-adulto.component.html',
  styleUrls: ['./ficha-adulto.component.css']
})
export class FichaAdultoComponent implements AfterViewInit,OnInit{
  constructor(private renderer: Renderer2,
              private scriptService: ScriptService) {

  }
  ngOnInit(): void {
    this.scriptService.loadJsScript(this.renderer, '/assets/custom/js/formularios/ficha-adulto.js');
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
