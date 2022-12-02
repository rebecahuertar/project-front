export class AuthDTO {
  user_id: string;
  tipo_usuario: string;
  access_token: string;
  email: string;
  password: string;

  constructor(
    user_id: string,
    tipo_usuario: string,
    access_token: string,
    email: string,
    password: string
  ) {
    this.user_id = user_id;
    this.tipo_usuario = tipo_usuario;
    this.access_token = access_token;
    this.email = email;
    this.password = password;
  }
}
