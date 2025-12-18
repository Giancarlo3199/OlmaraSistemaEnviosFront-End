import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { EmpresaTransporte } from '../models/EmpresaTransporte';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpresaTransporteService {

  private empresasSubject = new BehaviorSubject<EmpresaTransporte[]>([]);
  empresas$ = this.empresasSubject.asObservable();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<EmpresaTransporte[]>(
      `${environment.base}/empresa-transporte`
    ).pipe(
      tap(data => this.empresasSubject.next(data))
    );
  }

  listarPorId(id: number) {
    return this.http.get<EmpresaTransporte>(
      `${environment.base}/empresa-transporte/${id}`
    );
  }

  registrar(empresa: EmpresaTransporte) {
    return this.http.post(
      `${environment.base}/empresa-transporte`,
      empresa
    ).pipe(
      tap(() => this.listar().subscribe())
    );
  }

  modificar(empresa: EmpresaTransporte) {
    return this.http.put(
      `${environment.base}/empresa-transporte`,
      empresa
    ).pipe(
      tap(() => this.listar().subscribe())
    );
  }

  eliminar(id: number) {
    return this.http.delete(
      `${environment.base}/empresa-transporte/${id}`
    ).pipe(
      tap(() => this.listar().subscribe())
    );
  }
}
