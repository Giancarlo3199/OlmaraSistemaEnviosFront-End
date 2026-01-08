import { Ciudad } from "./Ciudad";
import { EmpresaTransporte } from "./EmpresaTransporte";
import { Usuario } from "./Usuario";

export interface Envio {
  id?: number;

  numeroGuiaInterna?: string;
  numeroFacturaInterna?: string;
  boletaInterna?: string;
  numeroGuiaExterna?: string;
  numeroFacturaExterna?: string;
  numeroTrackingExterno?: string;

  empresaTransporte?: EmpresaTransporte;

  tipoEnvio?: string;
  direccionEnvio?: string;

  ciudadPartida?: Ciudad;
  //ciudadLlegada?: Ciudad;
  destino?: string;
  cantidadCajas?: number;
  cantidadPaquetes?: number;
  cantidadSobres?: number;

  pesoTotal?: number;

  fechaEnvio?: string;
  fechaEstimadaLlegada?: string;
  fechaRecepcion?: string;
  fechaTransito?: string;

  montoPagado?: number;
  moneda?: string;

  estado?: string;
  comentarios?: string;

  operador?: Usuario;
  destinatario?: Usuario;
}
