export class ProductoDTO {
  id: string;
  idComercio: string;
  producto: string;

  constructor(id: string, idComercio: string, producto: string) {
    this.id = id;
    this.idComercio = idComercio;
    this.producto = producto;
  }
}
