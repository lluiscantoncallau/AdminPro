import { Injectable } from '@angular/core';
import { Usuario } from '../../Models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UploadService } from '../upload/upload.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, private router: Router, private subirArchivo: UploadService) {
    this.cargasStorage();
  }
  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token })
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario, false);
          return true;
        })
      );
  }

  estaLogueado() {
    if (!this.token) {
      return false;
    }
    return this.token.length > 1;
  }

  cargasStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  login(usuario: Usuario, recordar: boolean = false) {

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.id, resp.tokenm, resp.usuario, recordar);
          return true;
        })
      );
  }

  guardarStorage(id: string, token: string, usuario: Usuario, recordar: boolean) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    this.usuario = usuario;
    this.token = token;
  }
  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          Swal.fire('Usuario creado', 'Usuario creado correctamente', 'success');
          return resp.usuario;
        })
      );
  }

  actualizarUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${this.token}`;
    return this.http.put(url, usuario)
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.usuario._id, this.token, resp.usuario, false);
          Swal.fire('Usuario Actualizado', usuario.nombre, 'success');
          return true;
        })
      );
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivo.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        let recordar = false;
        if (localStorage.getItem('email')) {
          recordar = true;
        }
        this.guardarStorage(id, this.token, this.usuario, recordar);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

}
