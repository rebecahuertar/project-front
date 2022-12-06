export class ComercioDTO {
  idComercio?: string;
  nombre: string;
  apellidos: string;
  tipoUsuario: string;
  activo?: string;
  email: string;
  password: string;
  nombreComercio: string;
  descripcion: string;
  direccion: string;
  idCategoria: string;
  categoria: string;
  idMunicipio: string;
  municipio: string;
  idProvincia: string;
  provincia: string;
  codigopostal: string;
  web: string;
  telefono: string;

  constructor(
    idComercio: string,
    nombre: string,
    apellidos: string,
    tipoUsuario: string,
    activo: string,
    email: string,
    password: string,
    nombreComercio: string,
    descripcion: string,
    direccion: string,
    idCategoria: string,
    categoria: string,
    idMunicipio: string,
    municipio: string,
    idProvincia: string,
    provincia: string,
    codigopostal: string,
    web: string,
    telefono: string
  ) {
    this.idComercio = idComercio;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.tipoUsuario = tipoUsuario;
    this.activo = activo;
    this.email = email;
    this.password = password;
    this.nombreComercio = nombreComercio;
    this.descripcion = descripcion;
    this.direccion = direccion;
    this.idCategoria = idCategoria;
    this.categoria = categoria;
    this.idMunicipio = idMunicipio;
    this.municipio = municipio;
    this.idProvincia = idProvincia;
    this.provincia = provincia;
    this.codigopostal = codigopostal;
    this.web = web;
    this.telefono = telefono;
  }
}
