export class DiaaperturaDTO {
  id: string;
  idComercio: string;
  dia: string;
  estado: string;
  visible: string;

  constructor(
    id: string,
    idComercio: string,
    dia: string,
    estado: string,
    visible: string
  ) {
    this.id = id;
    this.idComercio = idComercio;
    this.dia = dia;
    this.estado = estado;
    this.visible = visible;
  }
}
