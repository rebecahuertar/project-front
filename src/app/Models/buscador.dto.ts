export class BuscadorDTO {
  idComercio: string;
  nombreComercio: string;
  descripcion: string;
  direccion: string;
  provincia: string;
  municipio: string;
  codigopostal: string;

  constructor(
    idComercio: string,
    nombreComercio: string,
    descripcion: string,
    direccion: string,
    provincia: string,
    municipio: string,
    codigopostal: string
  ) {
    this.idComercio = idComercio;
    this.nombreComercio = nombreComercio;
    this.descripcion = descripcion;
    this.direccion = direccion;
    this.provincia = provincia;
    this.municipio = municipio;
    this.codigopostal = codigopostal;
  }
}
