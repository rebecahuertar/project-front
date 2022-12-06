export class HorarioDTO {
  id: string;
  idComercio: string;
  descripcion: string;
  visible: string;

  constructor(
    id: string,
    idComercio: string,
    descripcion: string,
    visible: string
  ) {
    this.id = id;
    this.idComercio = idComercio;
    this.descripcion = descripcion;
    this.visible = visible;
  }
}
