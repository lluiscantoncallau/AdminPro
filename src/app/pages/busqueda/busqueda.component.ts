import { URL_SERVICIOS } from './../../config/config';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/Models/usuario.model';
import { Medico } from 'src/app/Models/medico.model';
import { Hospital } from '../../Models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hosptales: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient) {
    activatedRoute.params.subscribe(params => {
      this.buscar(params.termino);
    });
  }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/todo/${termino}`;
    this.http.get(url).subscribe((resp: any) => {
      console.log(resp);
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hosptales = resp.hospitales;
    });

  }
}
