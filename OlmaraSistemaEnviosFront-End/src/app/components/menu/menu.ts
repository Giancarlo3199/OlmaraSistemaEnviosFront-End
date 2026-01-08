import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AlertaEnvioService } from '../../services/alerta-envio.service';
import { MatDividerModule } from '@angular/material/divider';
import { AlertaEnvio } from '../../models/AlertaEnvio';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-menu',
  imports: [MatToolbarModule,
            MatIconModule,
            MatButtonModule,
            MatMenuModule,
            RouterLink,
          CommonModule, MatDividerModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})

export class Menu implements OnInit {

  private pollingSub?: Subscription;
  alertas: AlertaEnvio[] = [];
  contadorAlertas = 0;

  isLoggedIn = signal(false);
  rolUsuario = signal('');
  rutaActual = signal('');

  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertaService: AlertaEnvioService
  ) {
    this.loginService.loginStatus$.subscribe(e => this.isLoggedIn.set(e));

    this.loginService.userRol$.subscribe(r => this.rolUsuario.set(r));

    this.router.events.subscribe(() => {
      this.rutaActual.set(this.router.url);
    });
  }

  ngOnInit(): void {
    if (this.rolUsuario() === 'ADMIN') {
      this.alertaService.listarNoLeidas().subscribe();
      this.iniciarPollingAlertas();
    }
    else
      this.detenerPollingAlertas();
    this.alertaService.alertas$.subscribe(alertas => {
      this.alertas = alertas;
    });

    this.alertaService.contador$.subscribe(count => {
      this.contadorAlertas = count;
    });
  }

  logout(): void {
    this.detenerPollingAlertas();
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

   isLoggedInUsuario(): boolean {
    return this.isLoggedIn();
  }

  abrirAlerta(alerta: AlertaEnvio): void {
    this.alertaService.marcarComoLeida(alerta.id).subscribe(() => {
      this.router.navigate(['/envios/editar', alerta.envio.id]);
    });
  }

  rutaEsHome(): boolean {
    return this.rutaActual() === '/home';
  }

  iniciarPollingAlertas(): void {
  // evitar multiples intervalos
  if (this.pollingSub) {
    this.pollingSub.unsubscribe();
  }

  this.pollingSub = interval(10000) // cada 10 segundos se actualiza
    .pipe(
      switchMap(() => this.alertaService.contarNoLeidas())
    )
    .subscribe(count => {
      this.contadorAlertas = count;

      if (count > 0) {
        this.alertaService.listarNoLeidas().subscribe(data => {
          this.alertas = data;
        });
      } else {
        this.alertas = [];
      }
    });
}
 irAHome(): void {
    if (this.loginService.verificar()) {
      // Si está logueado, lo enviamos al panel de control
      this.router.navigate(['/inicio']);
    } else {
      // Si no está logueado, lo enviamos a la página de bienvenida
      this.router.navigate(['/home']);
    }
  }
detenerPollingAlertas(): void {
  if (this.pollingSub) {
    this.pollingSub.unsubscribe();
    this.pollingSub = undefined;
  }
}
}
