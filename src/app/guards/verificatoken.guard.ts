import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificatokenGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.usuarioService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenovacion(payload.exp);
  }

  verificaRenovacion(exp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(exp * 1000);
      const now = new Date();

      now.setTime(now.getTime() + (0.5 * 60 * 60 * 1000));

      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this.usuarioService.renuevaToken().subscribe(() => resolve(true), () => {
          this.router.navigate(['/login']);
          reject(false);
        });
      }

    });
  }

  expirado(exp: number) {
    const now = new Date().getTime() / 1000;
    if (exp < now) {
      return true;
    }
    return false;
  }
}
