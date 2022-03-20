/* Servicio creado para manejar la información de Registros a través de "firebase.com" */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // definimos las propiedades con las url de "firebase.com"
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts'; // lo común a las url de usuarios (nuevo y existente)
  private apiKey = 'AIzaSyD5OQ1p5Xt_jrSv-FJAnPaWwn8m1LrH2sE'; // copiamos desde "firebase.com" la Clave de API web de nuestro proyecto
  
  // creamos una propiedad para validar si el usuario ya existe (con el Token)
  userToken: string; 

  // crea un usuario nuevo
  // url de "firebase.com"
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // llama a un usuario ya existente
  // url de "firebase.com"
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  // inyectamos el servicio
  constructor( private http: HttpClient ) {

    this.leerToken();
  }

    // función para desloguearse (funciona destruyendo el token)
    logout() {

      localStorage.removeItem('token');
    };

    // función para loguearse
    login( usuario: UsuarioModel ) {

      // retornamos el email, password y returnSecureToken (según pide en "firebase.com")
      const authData = {

        email: usuario.email,
        password: usuario.password,
        returnSecureToken: true,
      };

      // petición POST 
      return this.http.post(`${this.url}:signInWithPassword?key=${this.apiKey}`,
      authData
      ).pipe(
        map( resp => {
          this.guardarToken( resp['idToken'] );
          return resp;
        })
      );;
    };

    // función para registrarse
    nuevoUsuario( usuario: UsuarioModel ) {

      // retornamos el email, password y returnSecureToken (según pide en "firebase.com")
      const authData = {

        email: usuario.email,
        password: usuario.password,
        returnSecureToken: true,
      };

      // petición POST 
      return this.http.post(`${this.url}:signUp?key=${this.apiKey}`,
      authData
      ).pipe(
        map( resp => {
          this.guardarToken( resp['idToken'] );
          return resp;
        })
      );
    }

    // función para guardar el Token del registro en el LocalStorage (que luego usaremos para validar)
    private guardarToken ( idToken: string ) {

      this.userToken = idToken;
      localStorage.setItem('token', idToken);

      // función para manejar el token (ya que se vence a la hora)
      let hoy = new Date(); // fecha de hoy
      hoy.setSeconds( 3600 ); // momento del vencimiento
      localStorage.setItem('expira', hoy.getTime().toString()); // almacenamos el dato anterior
    }

    // función para leer el Token (almacenado en la función anterior)
    private leerToken() {

      if (localStorage.getItem('token')) {
        this.userToken = localStorage.getItem('token');
      } else {
        this.userToken = '';
      }
      return this.userToken;
    }

    // función Guard para evitar la navegación desde la barra del navegador
    // si está autenticado podrá navegar al home
    estaAutenticado() : boolean {

      // validamos el token utilizando el almacenamiento obtenido del vencimiento del mismo
      if (this.userToken.length < 2) {
        return false;
      }
      const expira = Number(localStorage.getItem('expira'));
      const expiraDate = new Date();
      expiraDate.setTime(expira);

      if(expiraDate > new Date()) {
        return true;
      }else {
        return false;
      }
    }
}
