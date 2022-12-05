export class MensajeDTO {
  id?: string;
  idComercio: string;
  mensaje: string;
  visible: string;

  constructor(idComercio: string, mensaje: string, visible: string) {
    this.idComercio = idComercio;
    this.mensaje = mensaje;
    this.visible = visible;
  }
}
