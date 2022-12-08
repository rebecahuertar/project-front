export class FavoritoDTO {
  id: string;
  idCliente: string;
  idComercio: string;
  nombreComercio: string;
  verMensajes: string;

  constructor(
    id: string,
    idCliente: string,
    idComercio: string,
    nombreComercio: string,
    verMensajes: string
  ) {
    this.id = id;
    this.idCliente = idCliente;
    this.idComercio = idComercio;
    this.nombreComercio = nombreComercio;
    this.verMensajes = verMensajes;
  }
}
