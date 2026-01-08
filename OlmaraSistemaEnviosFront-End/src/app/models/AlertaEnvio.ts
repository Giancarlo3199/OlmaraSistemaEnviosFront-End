import { Envio } from "./Envio";

export interface AlertaEnvio {
  id: number;
  envio: Envio;
  tipoAlerta: string;
  mensaje: string;
  esLeida: boolean;
  createdAt: string; // LocalDateTime llega como string ISO
}
