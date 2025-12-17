import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService {

  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  usuarios$ = this.usuariosSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ======================
  // LISTAR (refresca tabla)
  // ======================
  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.base}/usuario`)
      .pipe(
        tap(data => this.usuariosSubject.next(data))
      );
  }

  // ======================
  // LISTAR POR ID
  // ======================
  listarPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.base}/usuario/${id}`);
  }

  // ======================
  // REGISTRAR (y refresca)
  // ======================
  registrar(usuario: Usuario): Observable<void> {
    return this.http.post<void>(`${environment.base}/usuario`, usuario)
      .pipe(
        tap(() => {
          this.listar().subscribe();
        })
      );
  }

  // ======================
  // MODIFICAR (y refresca)
  // ======================
  modificar(usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${environment.base}/usuario`, usuario)
      .pipe(
        tap(() => {
          this.listar().subscribe();
        })
      );
  }

  // ======================
  // ELIMINAR (y refresca)
  // ======================
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.base}/usuario/${id}`)
      .pipe(
        tap(() => {
          this.listar().subscribe();
        })
      );
  }
}
