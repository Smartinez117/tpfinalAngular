import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent implements OnInit {
  alumnos: Alumno[] = [];
  alumnosDelCurso:Alumno[] =[];
  alumno!: Alumno;
  errorMessage = '';
  mensaje = '';
  alumnoId = 0;
  alumnoId1 = 0;
  cursoIds: string = ""; //<---
  isDropdownOpen = false;
  isDropdownCursoOpen = false;

  nuevoAlumno: Partial<Alumno> = {}; // Usar Partial para permitir campos opcionales
  alumnoActualizar: Partial<Alumno> = {};

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.loadAllAlumnos();
  }

  loadAllAlumnos(): void {
    this.alumnoService.getAll().subscribe({
      next: (data) => this.alumnos = data,
      error: () => this.errorMessage = 'No se pudieron cargar los alumnos.'
    });
  }

  loadAlumnoById(id: number): void {
    this.alumnoService.getById(id).subscribe({
      next: (data) => this.alumno = data,
      error: () => this.errorMessage = 'No se pudo cargar el alumno.'
    });
  }


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


  guardarAlumno(): void {
    this.alumnoService.guardarAlumno(this.nuevoAlumno as Alumno).subscribe({
      next: () => {
        this.mensaje = 'Alumno guardado exitosamente!';
        this.nuevoAlumno = {};
      },
      error: () => this.mensaje = 'Error al guardar el alumno.'
    });
  }

  actualizarAlumno(): void {
    this.alumnoService.actualizarAlumno(this.alumnoActualizar as Alumno).subscribe({
      next: () => {
        this.mensaje = 'Alumno actualizado exitosamente!';
        this.alumnoActualizar = {};
      },
      error: () => this.mensaje = 'Error al actualizar el alumno.'
    });
  }

  inscribirseCurso(): void {
    if (this.cursoIds.length === 0) {
      this.errorMessage = 'La lista de cursos no puede estar vacía.';
      return;
    }
    if (this.alumnoId === 0) {
      this.errorMessage = 'Alumno no puede estar vacío.';
      return;
    }
    console.log("id:", this.alumnoId, "cursos:", this.cursoIds);

    this.alumnoService.inscribirseCurso(this.alumnoId, this.cursoIds).subscribe({
      next: () => {
        console.log(this.alumnoId, this.cursoIds);

        this.mensaje = 'Alumno inscrito exitosamente en los cursos!';
        this.alumnoId = 0;
        this.cursoIds = "";
      },
      error: (err) => {
        console.log("Error inscripcion:", err);

        this.errorMessage = 'Error al inscribir al alumno.';}
    });
  }

  eliminarAlumno(): void {
    if (!this.alumnoId) {
      this.errorMessage = 'Por favor, ingrese un ID de alumno válido.';
      return;
    }
    this.alumnoService.eliminarAlumno(this.alumnoId).subscribe({
      next: () => {
        this.mensaje = 'Alumno eliminado exitosamente!';
        this.alumnoId = 0;
      },
      error: () => this.errorMessage = 'Error al eliminar al alumno.'
    });
  }
}
