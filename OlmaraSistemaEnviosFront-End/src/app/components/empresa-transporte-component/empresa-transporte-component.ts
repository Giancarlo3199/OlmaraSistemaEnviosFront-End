import { Component, OnInit } from '@angular/core';
import { EmpresaTransporte } from '../../models/EmpresaTransporte';
import { EmpresaTransporteService } from '../../services/empresa-transporte.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empresa-transporte-component',
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './empresa-transporte-component.html',
  styleUrl: './empresa-transporte-component.css',
})
export class EmpresaTransporteComponent implements OnInit {

  empresas$!: Observable<EmpresaTransporte[]>;

  constructor(
    private service: EmpresaTransporteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.empresas$ = this.service.empresas$;
    this.service.listar().subscribe();
  }

  nuevaEmpresa() {
    this.router.navigate(['/empresa-transporte/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/empresa-transporte/editar', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Deseas eliminar esta empresa de transporte?')) {
      this.service.eliminar(id).subscribe();
    }
  }

  trackById(index: number, item: EmpresaTransporte) {
    return item.id;
  }
}
