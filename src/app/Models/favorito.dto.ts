export class FavoritoDTO {
  id?: string;
  idCliente: string;
  idComercio: string;
  nombreComercio: string;
  verMensajes: string;

  constructor(
    idCliente: string,
    idComercio: string,
    nombreComercio: string,
    verMensajes: string
  ) {
    this.idCliente = idCliente;
    this.idComercio = idComercio;
    this.nombreComercio = nombreComercio;
    this.verMensajes = verMensajes;
  }
}
