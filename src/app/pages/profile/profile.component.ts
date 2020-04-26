import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(private servicio: UsuarioService) {
    this.usuario = this.servicio.usuario;
  }

  ngOnInit(): void {
  }

  guardar(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.servicio.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result.toString();


  }

  cambiarImagen() {
    this.servicio.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
