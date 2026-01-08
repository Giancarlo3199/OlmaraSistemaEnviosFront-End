import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AlertaEnvio } from '../models/AlertaEnvio';

@Injectable({
  providedIn: 'root',
})
export class AlertaEnvioService {

  private alertasSubject = new BehaviorSubject<AlertaEnvio[]>([]);
  alertas$ = this.alertasSubject.asObservable();

  private contadorSubject = new BehaviorSubject<number>(0);
  contador$ = this.contadorSubject.asObservable();

  constructor(private http: HttpClient) {}

  listarNoLeidas(): Observable<AlertaEnvio[]> {
    return this.http.get<AlertaEnvio[]>(`${environment.base}/alerta-envio/no-leidas`)
      .pipe(
        tap(alertas => {
          this.alertasSubject.next(alertas);
          this.contadorSubject.next(alertas.length);
        })
      );
  }

  contarNoLeidas(): Observable<number> {
    return this.http.get<number>(`${environment.base}/alerta-envio/count`)
      .pipe(
        tap(count => this.contadorSubject.next(count))
      );
  }

  marcarComoLeida(id: number): Observable<void> {
    return this.http.put<void>(`${environment.base}/alerta-envio/leer/${id}`, {})
      .pipe(
        tap(() => this.listarNoLeidas().subscribe())
      );
  }
}
