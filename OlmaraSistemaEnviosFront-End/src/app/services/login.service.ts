import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtRequest } from '../models/JwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
 private loginStatus = new BehaviorSubject<boolean>(this.verificar());
  private userRol = new BehaviorSubject<string>(this.showRole() || '');

  loginStatus$ = this.loginStatus.asObservable();
  userRol$ = this.userRol.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(request: JwtRequest) {
    return this.http.post<any>(`${environment.base}/login`, request);
  }

  verificar() {
  if (isPlatformBrowser(this.platformId)) {
    return localStorage.getItem('token') != null;
  }
  return false;
}

showRole() {
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    return decoded?.role;
  }
  return null;
}

  getIdUsuario(): number | null {
    if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.idUsuario || null;
  }
  return null;
  }

  actualizarEstado(): void {
    this.loginStatus.next(this.verificar());
    this.userRol.next(this.showRole() || '');
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.clear();
  }
  this.loginStatus.next(false);
  this.userRol.next('');
  }
}
