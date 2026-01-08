import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Envio } from '../models/Envio';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvioService {

  private enviosSubject = new BehaviorSubject<Envio[]>([]);
  envios$ = this.enviosSubject.asObservable();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Envio[]>(`${environment.base}/envio`)
      .pipe(tap(data => this.enviosSubject.next(data)));
  }

  listarPorId(id: number) {
    return this.http.get<Envio>(`${environment.base}/envio/${id}`);
  }

  registrar(envio: Envio) {
    return this.http.post<void>(`${environment.base}/envio`, envio)
      .pipe(tap(() => this.listar().subscribe()));
  }

  modificar(envio: Envio) {
    return this.http.put<void>(`${environment.base}/envio`, envio)
      .pipe(tap(() => this.listar().subscribe()));
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${environment.base}/envio/${id}`)
      .pipe(tap(() => this.listar().subscribe()));
  }
}
