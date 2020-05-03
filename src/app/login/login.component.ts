import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../Models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/css/pages/login-register-lock.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, private usuarioService: UsuarioService) { }
  recuerdame = false;
  email: string;

  auth2: any;

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '3157745092-g0lt2jp0i5cp9ku8813jc3sg5ind6hh4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSingIn(document.getElementById('btnGoogle'));
    });
  }

  attachSingIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle(token)
        .subscribe(() => window.location.href = '#/dashboard' );
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(null, forma.value.email, forma.value.password);
    this.usuarioService.login(usuario, this.recuerdame)
      .subscribe((resp: any) => this.router.navigate(['/dashboard']));

  }
}
