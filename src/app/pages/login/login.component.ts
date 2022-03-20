import { Component, OnInit } from '@angular/core';
// importaciones
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // definimos la propiedad del UsuarioModel (sin inicializar)
  usuario: UsuarioModel;
  // definimos una propiedad para recordar el usuario
  recordarme : boolean;

  // inyectamos un "usuario existente" desde "auth.service.ts" y la ruta de redirección
  constructor( private auth: AuthService,
               private route: Router ) { }

  // inicializamos el UsuarioModel (creamos una nueva instancia del UsuarioModel)
  ngOnInit() {

    // se inicializan las propiedades
    this.recordarme = false;
    this.usuario = new UsuarioModel();

    // si se recarga la página recordamos al usuario (con LocalStorage) 
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  // funcionalidad del botón "Ingresar" que se llama del loguin.component.html
  login( form:NgForm ) {

    // validamos si el formulario es válido
    if( form.invalid) {return;}

    // si no valida, mostramos el error con "sweetalert2" 
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...',
    });
    Swal.showLoading();

    // si pasa la validación permitimos que el usuario (ya existente) inicie sesión
    this.auth.login( this.usuario ).subscribe( resp => {
      console.log(resp);
      Swal.close();

      // si se loguea recordamos al usuario (con LocalStorage)
      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }

      // si se loguea redireccionamos la ruta al Home
      this.route.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message)
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message,
      });
    });
  }

}
