import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { AlumnoService } from '../../services/alumno.service'; // Ajusta la ruta según tu estructura
import { Alumno } from '../../models/alumno.model'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent implements OnInit{
  alumnos: Alumno[] = []; // Para almacenar todos los alumnos
  alumnosDelCurso: Alumno[] = []; // Para almacenar los alumnos de un curso específico
  alumno!: Alumno; // Para almacenar un alumno específico
  errorMessage: string = ''; // Para manejar errores

  nuevoAlumno: Alumno = { nombre: '', fechaNacimiento: new Date, cursos:[] }; // Inicializa el objeto alumno sin ID
  alumnoActualizar: Alumno = { id: 0, nombre: '', fechaNacimiento: new Date() ,cursos:[]}; // Inicializa el objeto alumno
  mensaje: string = ''; // Para mostrar mensajes al usuario
  cursoIds: number[] = []; // Lista de IDs de cursos
  alumnoId: number = 0; // ID del alumno (inicialmente en 0)

  isDropdownOpen = false; // Estado del dropdown
  isDropdownCursoOpen = false; // Estado del dropdown para alumnos del curso


  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.loadAllAlumnos(); // Cargar todos los alumnos al inicializar
  }

// Método para cargar todos los alumnos
loadAllAlumnos(): void {
  this.alumnoService.getAll().subscribe({
    next: (data) => {
      this.alumnos = data; // Asignar los datos recibidos a la variable alumnos
    },
    error: (error) => {
      console.error('Error al cargar todos los alumnos:', error);
      this.errorMessage = 'No se pudieron cargar los alumnos.';
    }
  });
}

// Método para cargar un alumno por ID
loadAlumnoById(id: number): void {
  console.log("buscando id:", id);

  this.alumnoService.getById(id).subscribe({
    next: (data) => {
      console.log(data);

      this.alumno = data; // Asignar el alumno recibido a la variable alumno
    },
    error: (error) => {
      console.error('Error al cargar el alumno por ID:', error);
      this.errorMessage = 'No se pudo cargar el alumno.';
    }
  });
}

// Método para cargar los alumnos de un curso específico
loadAlumnosPorCurso(cursoId: number): void {
  this.alumnoService.getAlumnosPorCurso(cursoId).subscribe({
    next: (data) => {
      console.log(data);
      this.alumnosDelCurso = data; // Asignar los datos recibidos a la variable alumnos
    },
    error: (error) => {
      console.error('Error al cargar los alumnos del curso:', error);
      this.errorMessage = 'No se pudieron cargar los alumnos del curso.';
    }
  });
}

 // Método para guardar el nuevo alumno
 guardarAlumno(): void {
  this.alumnoService.guardarAlumno(this.nuevoAlumno).subscribe({
    next: (data) => {
      this.mensaje = 'Alumno guardado exitosamente!';
      this.nuevoAlumno = { nombre: '', fechaNacimiento: new Date() ,cursos:[]}; // Reiniciar formulario
    },
    error: (error) => {
      console.error('Error al guardar el alumno:', error);
      this.mensaje = 'Error al guardar el alumno.';
    }
  });

}


actualizarAlumno(): void {
  this.alumnoService.actualizarAlumno(this.alumnoActualizar).subscribe({
    next: (data) => {
      this.mensaje = 'Alumno actualizado exitosamente!';
      this.alumnoActualizar = { nombre: '', fechaNacimiento: new Date() ,cursos:[]}; // Reiniciar formulario
    },
    error: (error) => {
      console.error('Error al actualizar el alumno:', error);
      this.mensaje = 'Error al actualizar el alumno. Detalles: ' + error.message;
    }
  });
}

 // Método para inscribir al alumno en los cursos
 inscribirseCurso(): void {
  if (this.cursoIds.length === 0) {
    this.errorMessage = 'La lista de cursos no puede estar vacía.';
    return;
  }

  this.alumnoService.inscribirseCurso(this.alumnoId, this.cursoIds).subscribe({
    next: (data) => {
      this.mensaje = 'Alumno inscrito exitosamente en los cursos!';
      // Reiniciar valores si es necesario
      this.alumnoId = 0; // Reiniciar ID del alumno
      this.cursoIds = []; // Reiniciar lista de cursos
    },
    error: (error) => {
      console.error('Error al inscribir al alumno:', error);
      this.errorMessage = 'Error al inscribir al alumno. Detalles: ' + error.message;
    }
  });
}

  // Método para eliminar un alumno
  eliminarAlumno(): void {
    if (!this.alumnoId) {
      this.errorMessage = 'Por favor, ingrese un ID de alumno válido.';
      return;
    }

    this.alumnoService.eliminarAlumno(this.alumnoId).subscribe({
      next: (data) => {
        this.mensaje = 'Alumno eliminado exitosamente!';
        this.alumnoId = 0; // Reiniciar ID del alumno
      },
      error: (error) => {
        console.error('Error al eliminar al alumno:', error);
        this.errorMessage = 'Error al eliminar al alumno. Detalles: ' + error.message;
      }
    });
  }

}
