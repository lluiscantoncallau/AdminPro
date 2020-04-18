import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.getobs().pipe(
      map(value => value.valor),
      filter((fil, index) => {
        // console.log('filter Index:', index);
        return (fil % 2) === 0;
      }),
      retry(2)
    ).subscribe(
      num => console.log(num),
      error => console.error(error),
      () => console.log('El observador termino')
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getobs(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {

      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

      }, 1000);
    });
  }
}
