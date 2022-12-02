export class ProvinciaDTO {
  id!: string;
  provincia: string;

  constructor(id: string, provincia: string) {
    this.id = id;
    this.provincia = provincia;
  }
}
