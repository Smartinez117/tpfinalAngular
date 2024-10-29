import { Alumno } from './alumno.model'; // Asegúrate de ajustar la ruta
import { Tema } from './tema.model'; // Asegúrate de ajustar la ruta
import { Docente } from './docente.model'; // Asegúrate de ajustar la ruta

export class Curso {
  id?: number;
  tema: Tema; // Relación con el modelo Tema
  docente: Docente; // Relación con el modelo Docente
  fechaInicio: Date; // Usamos camelCase para seguir las convenciones de TypeScript
  fechaFin: Date;
  precio: number;
  alumnos: Alumno[]; // Lista de alumnos inscritos en el curso

  constructor() {
      this.id = 0; // Valor por defecto
      this.tema = new Tema(); // Inicializamos con un nuevo objeto Tema
      this.docente = new Docente(); // Inicializamos con un nuevo objeto Docente
      this.fechaInicio = new Date(); // Valor por defecto, se puede ajustar según sea necesario
      this.fechaFin = new Date(); // Valor por defecto, se puede ajustar según sea necesario
      this.precio = 0; // Valor por defecto
      this.alumnos = []; // Inicializamos como un array vacío
  }

}
