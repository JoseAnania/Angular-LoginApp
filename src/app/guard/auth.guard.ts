/* Servicio generado para proteger (Guard) que se pueda acceder a las rutas desde el navegador */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // inyectamos el servicio AuthService y redireccionamos en caso de intentar ingresar al home sin estar autenticado (al login)
  constructor( private auth: AuthService,
               private router: Router ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Guard');
    
    // consultamos si está autenticado
    if (this.auth.estaAutenticado()){
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }

  }
  
}
