import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-inicio',
  imports: [MatIconModule, CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit{
userRole: string = ''; // Aquí guardaremos el rol (ej: 'ADMIN' o 'USER')

constructor(private router: Router, private loginService: LoginService) {}

ngOnInit(): void {
    // Nos suscribimos al observable para obtener el rol actual
    this.loginService.userRol$.subscribe(data => {
      this.userRole = data;
    });
  }
irA(ruta: string) {
  this.router.navigate([ruta]);
}
}
