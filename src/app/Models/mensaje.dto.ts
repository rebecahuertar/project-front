export class MensajeDTO {
  id: string;
  idComercio: string;
  mensaje: string;
  visible: string;

  constructor(
    id: string,
    idComercio: string,
    mensaje: string,
    visible: string
  ) {
    this.id = id;
    this.idComercio = idComercio;
    this.mensaje = mensaje;
    this.visible = visible;
  }
}
