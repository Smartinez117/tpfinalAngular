import { Curso } from './curso.model'; // Asegúrate de ajustar la ruta
export class Docente {
  legajo: number; // Identificador único del docente
  nombre: string; // Nombre del docente
  cursos: Curso[]; // Lista de cursos que imparte el docente

  constructor() {
      this.legajo = 0; // Valor por defecto
      this.nombre = '';
      this.cursos = []; // Inicializamos como un array vacío
  }
}
