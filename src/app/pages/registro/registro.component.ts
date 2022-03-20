import { Component, OnInit } from '@angular/core';
// importamos el NgForm
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// importamos el módulo Usuario
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // definimos la propiedad del UsuarioModel (sin inicializar)
  usuario: UsuarioModel;
  // definimos una propiedad para recordar el usuario
  recordarme : boolean;

  // inyectamos un "nuevo usuario" desde "auth.service.ts" y la ruta de dirección
  constructor( private auth: AuthService, 
               private route: Router) { }

  // inicializamos el UsuarioModel (creamos una nueva instancia del UsuarioModel)
  ngOnInit() {

    // se inicializan las propiedades
    this.recordarme = false;
    this.usuario = new UsuarioModel();

  }

  // creamos la función del NgSubmit para guardar la info (de crear una cuenta) del ngForm (de nombre f)
  onSubmit( form: NgForm ) {

    // validamos si el formulario es válido
    if( form.invalid) {return;}

    // si no valida, mostramos el error con "sweetalert2" 
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...',
    });
    Swal.showLoading()

    // si pasa la validación creamos el nuevo usuario
    this.auth.nuevoUsuario(this.usuario).subscribe( resp => {
      console.log(resp);
      Swal.close();

      // si se loguea recordamos al usuario (con LocalStorage)
      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }
      
      // si se crea el nuevo usuario redireccionamos la ruta al Home
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
