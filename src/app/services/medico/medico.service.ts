import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Medico } from 'src/app/Models/medico.model';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  token: string;

  constructor(public http: HttpClient, public usuariosService: UsuarioService) {
    this.token = this.usuariosService.token;
  }

  cargarMedicos(skip: number = 0, take: number = 5) {
    const url = `${URL_SERVICIOS}/medico?skip=${skip}&take=${take}`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        const medicos: Medico[] = [];
        resp.medicos.forEach(element => {
          const medico = new Medico(element.nombre, element.img, element.usuario, element.hospital.nombre, element._id);
          medicos.push(medico);
        });
        return medicos;
      })
    );
  }

  obtenerMedico(id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}`;
    return this.http.get(url);
  }

  borrarMedico(id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}?token=${this.token}`;
    return this.http.delete(url);
  }

  crearMedico(medico: Medico) {
    const url = `${URL_SERVICIOS}/medico?token=${this.token}`;
    return this.http.post(url, medico)
      .pipe(
        map((resp: any) => {
          Swal.fire('Medico creado', 'Medico creado correctamente', 'success');
          return resp.medico;
        })
      );
  }

  guardarMedico(medico: Medico) {
    if (medico._id) {
      return this.actualizarMedico(medico);
    } else {
      return this.crearMedico(medico);
    }
  }

  buscarMedico(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        const medicos: Medico[] = [];
        resp.medicos.forEach(element => {
          const medico = new Medico(element.nombre, element.img, element.usuario, element.hospital.nombre, element._id);
          medicos.push(medico);
        });
        return medicos;
      })
    );
  }

  actualizarMedico(medico: Medico) {
    const url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this.token}`;
    return this.http.put(url, medico)
      .pipe(
        map((resp: any) => {
          Swal.fire('Medico Actualizado', medico.nombre, 'success');
          return resp;
        })
      );
  }

  cargarMedico(id: string) {

    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => {       
       return resp.medico;
      })
    );

  }
}

