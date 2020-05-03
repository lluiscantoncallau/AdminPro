import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/Models/hospital.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string; 

  constructor(public http: HttpClient, public usuariosService: UsuarioService) {
    this.token = this.usuariosService.token;
  }

  cargarHospitales(skip: number = 0, take: number = 5) {
    const url = `${URL_SERVICIOS}/hospital?skip=${skip}&take=${take}`;
    return this.http.get(url);
  }

  obtenerHospital(id: string) {
    const url = `${URL_SERVICIOS}/hospital/${id}`;
    return this.http.get(url);
  }

  borrarHospital(id: string) {
    const url = `${URL_SERVICIOS}/hospital/${id}?token=${this.token}`;
    return this.http.delete(url);
  }

  crearHospital(hospital: Hospital) {
    const url = `${URL_SERVICIOS}/hospital?token=${this.token}`;
    return this.http.post(url, hospital)
      .pipe(
        map((resp: any) => {
          Swal.fire('Hospital creado', 'Hospital creado correctamente', 'success');
          return resp.hospital;
        })
      );
  }

  buscarHospital(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;
    return this.http.get(url).pipe(
      map((resp: any) => resp.hospitales)
    );
  }

  actualizarHospital(hospital: Hospital) {
    const url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${this.token}`;
    return this.http.put(url, hospital)
      .pipe(
        map((resp: any) => {
          Swal.fire('Hospital Actualizado', hospital.nombre, 'success');
          return true;
        })
      );
  }
}
