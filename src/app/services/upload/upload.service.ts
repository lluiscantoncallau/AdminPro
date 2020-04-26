import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }


  subirArchivo(archivo: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            Swal.fire('Imagen actualizada', 'Image actualizada correctamente', 'success');
            resolve(JSON.parse(xhr.response));
          } else {
            Swal.fire('Error al actualizar', 'Se ha producido un error al actualizar la imagen', 'error');
            reject(xhr.response);
          }

        }
      };

      const url = `${URL_SERVICIOS}/upload/${tipo}/${id}`;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
