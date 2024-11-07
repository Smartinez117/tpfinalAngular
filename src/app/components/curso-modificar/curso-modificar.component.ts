import { Docente } from './../../models/docente.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso.model';
import { Tema } from '../../models/tema.model';

@Component({
  selector: 'app-curso-modificar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './curso-modificar.component.html',
  styleUrls: ['./curso-modificar.component.css']
})
export class CursoModificarComponent implements OnInit{
  cursos: Curso[] = [];
  nuevoCurso: Partial <Curso> = {};
  cursoId: number = 0;
  temaId: number = 0;
  docenteLegajo: number = 0;
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  precio: number = 0;
  mensaje: string = '';
  errorMessage: string = '';
  /*variables adicionales para que funciones*/
  cursoIdActualizar:number =0;
  cursoIdCambiarDo:number=0;
  cursoIdCambiarTe:number=0;
  cursoIdEliminar:number =0;
  /*variables para id doc y tem*/
  docenteLegajoCambiar:number=0;
  temaIdCambiar:number=0;


  constructor(private cursoService: CursoService) {}
  ngOnInit(): void {
    // Uncomment to load all courses on initialization
    // this.loadAllCursos();
  }

  crearCurso(): void {
    const cursoData: Curso = {
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      precio: this.nuevoCurso.precio || 0,
      tema: this.nuevoCurso.tema as Tema || {}, // Asegúrate de que tema esté definido
      docente: this.nuevoCurso.docente as Docente || {},
      alumnos: []

    };
    console.log('Fecha Inicio (componente):', this.fechaInicio);
    console.log('Fecha Fin (componente):', this.fechaFin);

    this.cursoService.crearCurso(this.temaId, cursoData, this.docenteLegajo).subscribe({

      next: () => {
        this.mensaje = 'Curso creado exitosamente!';
        this.resetNuevoCurso();
      },
      error: (error) => {
        this.mensaje = 'Error al crear el curso. Detalles: ' + error.message;
      }
    });
  }

  actualizarCurso(): void {
    this.cursoService.actualizarCurso(this.cursoIdActualizar, this.fechaInicio, this.fechaFin, this.precio).subscribe({
      next: () => {
        this.mensaje = 'Curso actualizado exitosamente!';
        this.resetActualizarDatos();
      },
      error: (error) => {
        this.errorMessage = 'Error al actualizar el curso. Detalles: ' + error.message;
      }
    });
  }

  cambiarDocente(): void {
    console.log("docente,componente antes del servicio ",this.docenteLegajo);

    this.cursoService.cambiarDocente(this.cursoIdCambiarDo, this.docenteLegajoCambiar).subscribe({
      next: () => {
        this.mensaje = 'Docente cambiado exitosamente!';
        this.resetCambioDocenteTema();
      },
      error: (error) => {
        this.errorMessage = 'Error al cambiar el docente. Detalles: ' + error.message;
      }
    });
  }

  cambiarTema(): void {
    console.log("tema,componente antes del servicio",this.temaIdCambiar);

    if (!this.cursoIdCambiarTe || !this.temaIdCambiar) {
      this.errorMessage = 'Por favor, ingrese un ID de curso y un ID de tema válidos.';
      return;
    }

    this.cursoService.cambiarTema(this.cursoIdCambiarTe, this.temaIdCambiar).subscribe({
      next: () => {
        this.mensaje = 'Tema cambiado exitosamente!';
        this.resetCambioDocenteTema();
      },
      error: (error) => {
        this.errorMessage = 'Error al cambiar el tema. Detalles: ' + error.message;
      }
    });
  }

  eliminarCurso(): void {
    if (!this.cursoIdEliminar) {
      this.errorMessage = 'Por favor, ingrese un ID de curso válido.';
      return;
    }

    this.cursoService.eliminarCurso(this.cursoIdEliminar).subscribe({
      next: () => {
        this.mensaje = 'Curso eliminado exitosamente!';
        this.cursoIdEliminar = 0;
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar el curso. Detalles: ' + error.message;
      }
    });
  }

  private resetNuevoCurso(): void {
    this.nuevoCurso = new Curso();
    this.temaId = 0;
    this.docenteLegajo = 0;
  }

  private resetActualizarDatos(): void {
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
    this.precio = 0;
    // Resetear mensaje si es necesario
    //this.mensaje = '';
  }

  private resetCambioDocenteTema(): void {
    this.cursoIdCambiarDo = 0;
    this.cursoIdCambiarTe =0;
    this.temaIdCambiar = 0;
    this.docenteLegajoCambiar=0;
    // Resetear mensaje si es necesario
    //this.mensaje = '';
  }

  onFechaInicioInput(event: any): void {
    const value = event.target.value; // dd-mm-yyyy
    this.fechaInicio = this.convertToDate(value); // Convierte a objeto Date
    console.log('Fecha Inicio:', this.fechaInicio);
  }

  onFechaFinInput(event: any): void {
    const value = event.target.value; // dd-mm-yyyy
    this.fechaFin = this.convertToDate(value); // Convierte a objeto Date
    console.log('Fecha Fin:', this.fechaFin);
  }


  convertToDate(dateString: string): Date {
    const parts = dateString.split('/');
    if (parts.length !== 3) {
      throw new Error('Formato de fecha inválido. Debe ser dd/mm/yyyy.');
    }
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Los meses son indexados desde cero
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day); // Devuelve un objeto Date
  }
}
