import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso = 20;
  progresoVerde = 30;

  minusDisabled = false;
  maxDisabled = false;
  constructor() {

  }


  ngOnInit(): void {
  }


}
