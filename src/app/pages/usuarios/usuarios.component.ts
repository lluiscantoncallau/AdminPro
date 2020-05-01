import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  skip = 0;
  totalRegistros = 0;
  cargando = true;
  constructor(public usuarioService: UsuarioService,
              public modalService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.modalService.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.skip).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
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
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino) {
      this.usuarioService.buscarUsuarios(termino)
        .subscribe((usuarios: Usuario[]) => {
          this.usuarios = usuarios;
          this.totalRegistros = this.usuarios.length;
        });
    } else {
      this.cargarUsuarios();
    }

  }

  mostrarModal(usuario: Usuario){
    this.modalService.mostrarModal('usuarios', usuario._id);
  }


  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuarioService.usuario._id) {
      Swal.fire('No puede borrar el usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    Swal.fire({
      title: 'Borrar Usuario',
      html: `Esta seguro que desea eliminar este Usuario: <br> <strong> ${usuario.nombre} </strong> ? `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.value) {
          this.usuarioService.EliminarUsuario(usuario).subscribe((resp: Usuario) => {
            swalWithBootstrapButtons.fire(
              'Usuario Eliminado!',
              `El usuario: ${resp.nombre} a sido eliminado.`,
              'success'
            );
            this.cargarUsuarios();
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

  GuardarCambios(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();

  }

}
