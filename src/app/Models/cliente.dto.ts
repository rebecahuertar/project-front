export class ClienteDTO {
  id?: string;
  nombre: string;
  apellidos: string;
  tipoUsuario: string;
  activo?: string;
  email: string;
  password: string;
  idMunicipio: string;
  idProvincia: string;
  codigopostal: string;

  constructor(
    id: string,
    nombre: string,
    apellidos: string,
    tipoUsuario: string,
    activo: string,
    email: string,
    password: string,
    idMunicipio: string,
    idProvincia: string,
    codigopostal: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.tipoUsuario = tipoUsuario;
    this.activo = activo;
    this.email = email;
    this.password = password;
    this.idMunicipio = idMunicipio;
    this.idProvincia = idProvincia;
    this.codigopostal = codigopostal;
  }
}
