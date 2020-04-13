import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() leyenda = 'Leyenda';
  @Input() progreso = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress') txtProgress: ElementRef;

  minusDisabled = false;
  maxDisabled = false;

  constructor() { }

  ngOnInit(): void {
  }

  onChanges(newValue: number) {

    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue < 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }


  cambiarProgreso(value: number) {
    this.progreso = this.progreso + value;
    if (this.progreso === 0) {
      this.minusDisabled = true;
      this.maxDisabled = false;
    }

    if (this.progreso === 100) {
      this.minusDisabled = false;
      this.maxDisabled = true;
    }

    if (this.progreso > 0 && this.progreso < 100) {
      this.minusDisabled = false;
      this.maxDisabled = false;
    }

    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }
}
