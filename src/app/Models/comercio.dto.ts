export class ComercioDTO {
  id?: string;
  nombre: string;
  apellidos: string;
  tipoUsuario: string;
  activo?: string;
  email: string;
  password: string;
  nombreComercio: string;
  descripcion: string;
  direccion: string;
  idMunicipio: string;
  idProvincia: string;
  codigopostal: string;
  web: string;
  telefono: string;

  constructor(
    id: string,
    nombre: string,
    apellidos: string,
    tipoUsuario: string,
    activo: string,
    email: string,
    password: string,
    nombreComercio: string,
    descripcion: string,
    direccion: string,
    idMunicipio: string,
    idProvincia: string,
    codigopostal: string,
    web: string,
    telefono: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.tipoUsuario = tipoUsuario;
    this.activo = activo;
    this.email = email;
    this.password = password;
    this.nombreComercio = nombreComercio;
    this.descripcion = descripcion;
    this.direccion = direccion;
    this.idMunicipio = idMunicipio;
    this.idProvincia = idProvincia;
    this.codigopostal = codigopostal;
    this.web = web;
    this.telefono = telefono;
  }
}
