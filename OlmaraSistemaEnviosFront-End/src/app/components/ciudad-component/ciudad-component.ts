import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudad } from '../../models/Ciudad';
import { CiudadService } from '../../services/ciudad.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ciudad-component',
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './ciudad-component.html',
  styleUrl: './ciudad-component.css',
})
export class CiudadComponent implements OnInit {

  ciudades$!: Observable<Ciudad[]>;

  constructor(
    private ciudadService: CiudadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ciudades$ = this.ciudadService.ciudades$;
    this.ciudadService.listar().subscribe();
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro de eliminar esta ciudad?')) return;
    this.ciudadService.eliminar(id).subscribe();
  }

  editar(id: number): void {
    this.router.navigate(['/ciudades/editar', id]);
  }

  nuevaCiudad(): void {
    this.router.navigate(['/ciudades/nuevo']);
  }

  trackById(index: number, item: Ciudad) {
    return item.idCiudad;
  }
}

