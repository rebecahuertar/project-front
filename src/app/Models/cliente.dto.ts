export class ClienteDTO {
  idCliente?: string;
  nombre: string;
  apellidos: string;
  tipoUsuario: string;
  activo?: string;
  email: string;
  password: string;
  idMunicipio: string;
  municipio: string;
  idProvincia: string;
  provincia: string;
  codigopostal: string;

  constructor(
    idCliente: string,
    nombre: string,
    apellidos: string,
    tipoUsuario: string,
    activo: string,
    email: string,
    password: string,
    idMunicipio: string,
    municipio: string,
    idProvincia: string,
    provincia: string,
    codigopostal: string
  ) {
    this.idCliente = idCliente;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.tipoUsuario = tipoUsuario;
    this.activo = activo;
    this.email = email;
    this.password = password;
    this.idMunicipio = idMunicipio;
    this.municipio = municipio;
    this.idProvincia = idProvincia;
    this.provincia = provincia;
    this.codigopostal = codigopostal;
  }
}
