import { Component, OnInit } from '@angular/core';
import { AlertaEnvioService } from '../../services/alerta-envio.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alertas-component',
  imports: [CommonModule, MatCardModule, MatButtonModule,
    MatIconModule
  ],
  templateUrl: './alertas-component.html',
  styleUrl: './alertas-component.css',
})
export class AlertasComponent implements OnInit {

  alertas: any[] = [];

  constructor(private alertaService: AlertaEnvioService) {}

  ngOnInit(): void {
    this.alertaService.listarNoLeidas().subscribe(data => {
      this.alertas = data;
    });
  }
}
