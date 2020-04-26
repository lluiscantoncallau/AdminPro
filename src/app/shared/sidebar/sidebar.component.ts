import { SidebarService } from './../../services/services.index';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})

export class SidebarComponent implements OnInit {

  constructor(public service: SidebarService, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

}
