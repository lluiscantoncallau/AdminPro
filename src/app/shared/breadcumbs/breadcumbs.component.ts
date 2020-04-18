import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styles: []
})
export class BreadcumbsComponent implements OnInit {

  titulo: string;
  constructor(private router: Router, private title: Title, private meta: Meta) {

    this.getDataRoute().subscribe(evento => {
      this.titulo = evento.titulo;
      this.title.setTitle(this.titulo);

      const metatag: MetaDefinition = {
        name:  'description',
        content: this.titulo
      };

      this.meta.updateTag(metatag);
    });
  }

  ngOnInit(): void {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data));
  }
}
