import { Injectable } from '@angular/core';
import { Ciudad } from '../models/Ciudad';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {

  private ciudadesSubject = new BehaviorSubject<Ciudad[]>([]);
  ciudades$ = this.ciudadesSubject.asObservable();

  constructor(private http: HttpClient) {}

  listar(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${environment.base}/ciudad`)
      .pipe(
        tap(data => this.ciudadesSubject.next(data))
      );
  }

  listarPorId(id: number): Observable<Ciudad> {
    return this.http.get<Ciudad>(`${environment.base}/ciudad/${id}`);
  }

  registrar(ciudad: Ciudad): Observable<void> {
    return this.http.post<void>(`${environment.base}/ciudad`, ciudad)
      .pipe(
        tap(() => this.listar().subscribe())
      );
  }

  modificar(ciudad: Ciudad): Observable<void> {
    return this.http.put<void>(`${environment.base}/ciudad`, ciudad)
      .pipe(
        tap(() => this.listar().subscribe())
      );
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.base}/ciudad/${id}`)
      .pipe(
        tap(() => this.listar().subscribe())
      );
  }
}
