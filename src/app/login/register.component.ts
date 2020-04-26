import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../Models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../assets/css/pages/login-register-lock.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public usuarioService: UsuarioService,
     public router: Router) { }

  ngOnInit(): void {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      clave: new FormControl(null, Validators.required),
      confirmar: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
    }, { validators: this.sonIgualesValidator('clave', 'confirmar') });
  }

  sonIgualesValidator(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      if (group.controls[campo1].value === group.controls[campo2].value) {
        return null;
      }
      return { sonIguales: true };
    };
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      Swal.fire('Condiciones obligatorias', 'Es obligatorio aceptar las condiciones para continuar', 'warning');
      return;
    }

    let usuario = new Usuario(this.forma.value.nombre, this.forma.value.email, this.forma.value.clave);
    this.usuarioService.crearUsuario(usuario)
      .subscribe(resp =>  this.router.navigate(['/login']));

  }

}
