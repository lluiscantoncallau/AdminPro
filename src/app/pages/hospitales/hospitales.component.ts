import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../Models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  skip = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(public hospitalService: HospitalService,
              public modalService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.modalService.notificacion.subscribe(resp => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.skip).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  cambiarSkip(value: number) {
    const newSkip = this.skip + value;
    if (newSkip >= this.totalRegistros) {
      return;
    }
    if (newSkip < 0) {
      return;
    }

    this.skip = newSkip;
    this.cargarHospitales();
  }

  buscarHospital(termino: string) {
    if (termino) {
      this.hospitalService.buscarHospital(termino)
        .subscribe((hospitales: Hospital[]) => {
          this.hospitales = hospitales;
          this.totalRegistros = this.hospitales.length;
        });
    } else {
      this.cargarHospitales();
    }

  }

  mostrarModal(hospital: Hospital) {
    this.modalService.mostrarModal('hospitales', hospital._id);
  }

  crearHospital() {
    Swal.fire({
      title: 'Introducir nombre del nuevo hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'On'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.value) {
        const hospital = new Hospital(result.value);
        this.hospitalService.crearHospital(hospital).subscribe(() => this.cargarHospitales());
      }
    });
  }

  borrarHospital(hospital: Hospital) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    Swal.fire({
      title: 'Borrar Hospital',
      html: `Esta seguro que desea eliminar este hospital: <br> <strong> ${hospital.nombre} </strong> ? `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.value) {
          this.hospitalService.borrarHospital(hospital._id).subscribe((resp: Hospital) => {
            swalWithBootstrapButtons.fire(
              'Hospital Eliminado!',
              `El usuario: ${resp.nombre} a sido eliminado.`,
              'success'
            );
            this.cargarHospitales();
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'No se ha realizado ningun cambio',
            'success'
          );
        }
      });

  }

  GuardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe();

  }

}
