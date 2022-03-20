import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // inyectamos el servicio de protección Auth y la ruta para direccionar al apretar "salir" al login
  constructor( private auth:AuthService,
               private router: Router) { }

  ngOnInit() {
  }

  // método salir que se llama desde el Home
  salir() {

    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
