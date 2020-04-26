import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): string {

   
    if (img.indexOf('https') >= 0) {    
      return img;
    }

    let url = URL_SERVICIOS + '/img';

    if (!img) {
      return url + 'usuarios/noimage';
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/hopitales/' + img;
        break;
      default:
        console.log('exisiste el tipo de imagen');
        return url + 'usuarios/noimage';  
    }

    return url;
  }

}
