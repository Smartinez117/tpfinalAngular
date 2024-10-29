import { Curso } from './curso.model'; // Asegúrate de que esta ruta sea correcta

export class Alumno {
  id?: number;
  nombre: string;
  fechaNacimiento: Date; // Usamos camelCase para seguir las convenciones de TypeScript
  cursos: Curso[]; // Asumiendo que ya tienes el modelo de Curso importado

  constructor() {
      this.id = 0; // Valor por defecto
      this.nombre = '';
      this.fechaNacimiento = new Date(); // Valor por defecto, se puede ajustar según sea necesario
      this.cursos = []; // Inicializamos como un array vacío
  }
}

/*
export class Alumno {
  id: number;
  nombre: string;
  fecha_nacimiento: Date;
  cursos: Curso[];

  constructor(id: number, nombre: string, fecha_nacimiento: Date, cursos: Curso[]) {
    this.id= id;
    this.nombre = nombre;
    this.fecha_nacimiento = fecha_nacimiento;
    this.cursos = cursos;
  }

}
*/
