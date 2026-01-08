import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Envio } from '../../models/Envio';
import { EnvioService } from '../../services/envio.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-envio-component',
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './envio-component.html',
  styleUrl: './envio-component.css',
})
export class EnvioComponent implements OnInit {

  envios$!: Observable<Envio[]>;

  constructor(
    private envioService: EnvioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.envios$ = this.envioService.listar();
  }

  nuevoEnvio(): void {
    this.router.navigate(['/envios/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/envios/editar', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Está seguro de eliminar el envío?')) {
      this.envioService.eliminar(id).subscribe(() => {
      });
    }
  }

  trackById(index: number, item: Envio) {
    return item.id;
  }
}
