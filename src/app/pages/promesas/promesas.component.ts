import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarTres().then((respuesta) => console.log(respuesta)).catch((error) => console.error(error));
  }

  ngOnInit(): void {
  }

  contarTres(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let contador = 0;
      const invervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          clearInterval(invervalo);
        }
      }, 1000);
    });
    
  }

}
