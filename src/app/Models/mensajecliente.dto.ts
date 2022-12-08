export class MensajeClienteDTO {
  idFavorito: string;
  idCliente: string;
  idComercio: string;
  nombreComercio: string;
  verMensajes: string;
  id: string;
  mensaje: string;
  visible: string;
  updated_at: Date;

  constructor(
    idFavorito: string,
    idCliente: string,
    idComercio: string,
    nombreComercio: string,
    verMensajes: string,
    id: string,
    mensaje: string,
    visible: string,
    updated_at: Date
  ) {
    this.idFavorito = idFavorito;
    this.idCliente = idCliente;
    this.idComercio = idComercio;
    this.nombreComercio = nombreComercio;
    this.verMensajes = verMensajes;
    this.id = id;
    this.mensaje = mensaje;
    this.visible = visible;
    this.updated_at = updated_at;
  }
}
