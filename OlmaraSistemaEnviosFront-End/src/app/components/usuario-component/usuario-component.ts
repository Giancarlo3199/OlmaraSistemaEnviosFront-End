import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-component',
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './usuario-component.html',
  styleUrl: './usuario-component.css',
})


export class  UsuarioComponent implements OnInit {

  usuarios$!: Observable<Usuario[]>;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarios$ = this.usuarioService.usuarios$;
    this.usuarioService.listar().subscribe();
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro de eliminar este usuario?')) return;
    this.usuarioService.eliminar(id).subscribe();
  }

  editar(id: number): void {
    this.router.navigate(['/usuarios/editar', id]);
  }

  nuevoUsuario(): void {
    this.router.navigate(['/usuarios/nuevo']);
  }

  trackById(index: number, item: Usuario) {
    return item.id;
  }
}
