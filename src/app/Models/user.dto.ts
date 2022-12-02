export class UserDTO {
  id?: string;
  access_token?: string;
  nombre: string;
  apellidos: string;
  tipoUsuario: string;
  activo?: string;
  email: string;
  password: string;

  constructor(
    nombre: string,
    apellidos: string,
    tipoUsuario: string,
    email: string,
    password: string
  ) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.tipoUsuario = tipoUsuario;
    this.email = email;
    this.password = password;
  }
}
