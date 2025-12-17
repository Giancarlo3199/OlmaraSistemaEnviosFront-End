import { Rol } from "./Rol";

export class Usuario {
  id: number = 0;
  nombres: string = '';
  apellidos: string = '';
  documentoIdentidad: string = '';
  telefono: string = '';
  correo: string = '';
  username: string = '';
  activo: boolean = false;
  rol: Rol = new Rol();
}
