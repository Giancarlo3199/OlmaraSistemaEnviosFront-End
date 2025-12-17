import { Component } from '@angular/core';
import { Menu } from "./components/menu/menu";
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  imports: [Menu,RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'OlmaraSistemaEnviosFront-End';
  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginService.actualizarEstado();
  }

   get mostrarMenu() {
    const ocultarRutas = ['/login', '/register'];
    return !ocultarRutas.includes(this.router.url);
  }
}
