import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { CursoService } from '../../services/curso.service'; // Ajusta la ruta según tu estructura
import { Curso } from '../../models/curso.model'; // Ajusta la ruta según tu estructura
import { Tema } from '../../models/tema.model'; // Ajusta la ruta según tu estructura
import { Docente } from '../../models/docente.model'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent implements OnInit {
  cursos: Curso[] = []; // Para almacenar todos los cursos
  cursosFecha: Curso[]=[] //para almacenar los cursos que finalizan una fehca especifica
  curso!: Curso; // Para almacenar un curso específico
  errorMessage: string = ''; // Para manejar errores


  // Nuevas variables
  isDropdownOpen = false; // Estado del dropdown para todos los cursos
  isDropdownFechaOpen = false; // Estado del dropdown para cursos por fecha
  cursosPorFecha: Curso[] = []; // Para almacenar cursos que finalizan en una fecha específica

  nuevoCurso: Curso = new Curso(); // Inicializa el objeto curso usando el constructor del modelo
  temaId: number = 0; // ID del tema
  docenteLegajo: number = 0; // Legajo del docente
  mensaje: string = ''; // Para mostrar mensajes al usuario

  cursoId: number=99 ; // ID del curso a actualizar (puedes cambiarlo según tu lógica)
  fechaInicio: Date = new Date(); // Fecha de inicio por defecto
  fechaFin: Date = new Date();  // Fecha de finalización por defecto
  precio: number = 0; // Precio por defecto

  cursoIdcambiar!:number;



  constructor(private cursoService: CursoService) { 
  this.NewItem= new Curso();

  }
  public NewItem :Curso;

  ngOnInit(): void {
    //this.loadAllCursos(); // Cargar todos los cursos al inicializar
  }

  // Método para cargar todos los cursos
  loadAllCursos(): void {
    this.cursoService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.cursos = data; // Asignar los datos recibidos a la variable cursos
      },
      error: (error) => {
        console.error('Error al cargar todos los cursos:', error);
        this.errorMessage = 'No se pudieron cargar los cursos.';
      }
    });
  }

  // Método para cargar un curso por ID
  loadCursoById(id: number): void {
    this.cursoService.getById(id).subscribe({
      next: (data) => {
        this.curso = data; // Asignar el curso recibido a la variable curso
      },
      error: (error) => {
        console.error('Error al cargar el curso por ID:', error);
        this.errorMessage = 'No se pudo cargar el curso.';
      }
    });
  }

  // Método para cargar cursos que finalizan en una fecha específica
  loadCursosPorFecha(fecha: string): void {
    this.cursoService.getCursosPorFechaFinalizacion(fecha).subscribe({
      next: (data) => {
        console.log("cargando cursos");

        console.log(data);

        this.cursosPorFecha = data; // Asignar los datos recibidos a la variable cursos
      },
      error: (error) => {
        console.error('Error al cargar los cursos que finalizan:', error);
        this.errorMessage = 'No se pudieron cargar los cursos que finalizan en esa fecha.';
      }
    });
  }
// POST PARA CREAR UN NUEVO CURSO CON TEMA Y DOCENTE
  // Método para guardar el nuevo curso
  crearCurso(): void {
    const cursoData: Curso = {
      tema: this.nuevoCurso.tema, // Aquí puedes asignar un objeto Tema válido si es necesario
      docente: this.nuevoCurso.docente, // Aquí puedes asignar un objeto Docente válido si es necesario
      fechaInicio: this.nuevoCurso.fechaInicio,
      fechaFin: this.nuevoCurso.fechaFin,
      precio: this.nuevoCurso.precio,
      alumnos: [] // Inicializa como un array vacío o con los alumnos correspondientes si es necesario
    };
    if (typeof this.nuevoCurso.fechaInicio === 'string') {
      this.nuevoCurso.fechaInicio = new Date(this.nuevoCurso.fechaInicio);
    }
    if (typeof this.nuevoCurso.fechaFin === 'string') {
      this.nuevoCurso.fechaFin = new Date(this.nuevoCurso.fechaFin);
    }

    this.cursoService.crearCurso(this.temaId, cursoData, this.docenteLegajo).subscribe({
      next: (data) => {
        this.mensaje = 'Curso creado exitosamente!';
        this.nuevoCurso = new Curso(); // Reiniciar formulario usando el constructor del modelo
        this.temaId = 0; // Reiniciar ID del tema
        this.docenteLegajo = 0; // Reiniciar legajo del docente
      },
      error: (error) => {
        console.error('Error al crear el curso:', error);
        this.mensaje = 'Error al crear el curso. Detalles: ' + error.message; // Proporciona detalles del error
      }
    });
  }


    // Método para actualizar el curso
    actualizarCurso(): void {
      if (typeof this.fechaInicio === 'string') {
        this.fechaInicio = new Date(this.fechaInicio);
      }
      if (typeof this.fechaFin === 'string') {
        this.fechaFin = new Date(this.fechaFin);
      }

      this.cursoService.actualizarCurso(this.cursoId, this.fechaInicio, this.fechaFin, this.precio).subscribe({
        next: (data) => {
          console.log(data);

          this.mensaje = 'Curso actualizado exitosamente!';
          this.fechaInicio = new Date() ;
          this.fechaFin = new Date();
          this.precio = 0;
        },
        error: (error) => {
          console.error('Error al actualizar el curso:', error);
          this.errorMessage = 'Error al actualizar el curso. Detalles: ' + error.message;
        }
      });
    }

  // Método para cambiar el docente del curso
  cambiarDocente(): void {
    console.log(this.cursoId);
    
    this.cursoService.cambiarDocente(this.cursoId, this.docenteLegajo).subscribe({
      next: (data) => {
        this.mensaje = 'Docente cambiado exitosamente!'
        this.cursoId= 0
      },
      error: (error) => {
        console.error('Error al cambiar el docente:', error);
        this.errorMessage = 'Error al cambiar el docente. Detalles: ' + error.message;
      }
    });
  }

   // Método para cambiar el tema del curso
   cambiarTema(): void {
    if (!this.cursoId || !this.temaId) {
      this.errorMessage = 'Por favor, ingrese un ID de curso y un ID de tema válidos.';
      return;
    }

    this.cursoService.cambiarTema(this.cursoId, this.temaId).subscribe({
      next: (data) => {
        this.mensaje = 'Tema cambiado exitosamente!';
        // Reiniciar valores si es necesario
        this.cursoId = 0; // Reiniciar ID del curso
        this.temaId = 0; // Reiniciar ID del tema
      },
      error: (error) => {
        console.error('Error al cambiar el tema:', error);
        this.errorMessage = 'Error al cambiar el tema. Detalles: ' + error.message;
      }
    });
  }

// Método para eliminar un curso
eliminarCurso(): void {
  if (!this.cursoId) {
    this.errorMessage = 'Por favor, ingrese un ID de curso válido.';
    return;
  }

  this.cursoService.eliminarCurso(this.cursoId).subscribe({
    next: (data) => {
      this.mensaje = 'Curso eliminado exitosamente!';
      this.cursoId = 0; // Reiniciar ID del curso
    },
    error: (error) => {
      console.error('Error al eliminar el curso:', error);
      this.errorMessage = 'Error al eliminar el curso. Detalles: ' + error.message;
    }
  });
}

}
