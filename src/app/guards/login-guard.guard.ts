import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(private service: UsuarioService, private router: Router) {

  }
  canActivate(): boolean {
    if (!this.service.estaLogueado()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
