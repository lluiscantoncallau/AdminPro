import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public service: UsuarioService, private router: Router) { }

  ngOnInit(): void {

  }

  buscar(termino: string){
    this.router.navigate(['/busqueda', termino]);
  }
}
