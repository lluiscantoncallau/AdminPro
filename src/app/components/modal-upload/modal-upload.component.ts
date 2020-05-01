import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario.model';
import { UploadService } from '../../services/upload/upload.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(public uploadService: UploadService,
    public modalservice: ModalUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalservice.ocularModal();
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

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result.toString();


  }

  subirImagen() {
    this.uploadService.subirArchivo(this.imagenSubir, this.modalservice.tipo, this.modalservice.id)
      .then((resp: any) => {
          this.modalservice.notificacion.emit(resp);
          this.cerrarModal();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
