export class CategoriaDTO {
  id?: string;
  nombre: string;

  constructor(id: string, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }
}
