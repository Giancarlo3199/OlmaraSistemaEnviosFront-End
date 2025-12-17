import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/Rol';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolService {

  private url = `${environment.base}/rol`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.url);
  }
}
