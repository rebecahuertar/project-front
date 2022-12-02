export class MunicipioDTO {
  id: string;
  idProvincia: string;
  municipio: string;

  constructor(id: string, idProvincia: string, municipio: string) {
    this.id = id;
    this.idProvincia = idProvincia;
    this.municipio = municipio;
  }
}
