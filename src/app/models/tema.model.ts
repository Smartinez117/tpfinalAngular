import { Curso } from './curso.model'; // Asegúrate de ajustar la ruta

export class Tema {
  id?: number; // Identificador único del tema
  nombre: string; // Nombre del tema
  descripcion: string; // Descripción del tema
  cursos: Curso[]; // Lista de cursos asociados al tema

  constructor() {
      this.id = 0; // Valor por defecto
      this.nombre = '';
      this.descripcion = '';
      this.cursos = []; // Inicializamos como un array vacío
  }
}
