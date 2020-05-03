import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from 'src/app/Models/medico.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  skip = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(public medicoService: MedicoService,
    public modalService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.modalService.notificacion.subscribe(resp => this.cargarMedicos());
  }

  
  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos(this.skip).subscribe((resp: any) => {      
      this.totalRegistros = resp.length;
      this.medicos = resp;
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
    this.cargarMedicos();
  }

  buscarMedico(termino: string) {
    if (termino) {
      this.medicoService.buscarMedico(termino)
        .subscribe((medicos: Medico[]) => {
          console.log(medicos);
          this.medicos = medicos;
          this.totalRegistros = this.medicos.length;
        });
    } else {
      this.cargarMedicos();
    }

  }

  mostrarModal(medico: Medico) {
    this.modalService.mostrarModal('medicos', medico._id);
  }

  borrarMedico(medico: Medico) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    Swal.fire({
      title: 'Borrar medico',
      html: `Esta seguro que desea eliminar este medico: <br> <strong> ${medico.nombre} </strong> ? `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.value) {
          this.medicoService.borrarMedico(medico._id).subscribe((resp: Medico) => {
            swalWithBootstrapButtons.fire(
              'Medico Eliminado!',
              `El usuario: ${resp.nombre} a sido eliminado.`,
              'success'
            );
            this.cargarMedicos();
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

  GuardarCambios(medico: Medico) {
    this.medicoService.actualizarMedico(medico).subscribe();

  }
}
