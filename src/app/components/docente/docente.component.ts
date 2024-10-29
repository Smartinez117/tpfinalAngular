import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { DocenteService } from '../../services/docente.service'; // Ajusta la ruta según tu estructura
import { Docente } from '../../models/docente.model'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent implements OnInit {
  docentes: Docente[] = []; // Para almacenar todos los docentes
  docente!: Docente; // Para almacenar un docente específico
  errorMessage: string = ''; // Para manejar errores
  docenteId:number =0;

  //guardar un nuevo docente.
  nuevoDocente: Docente = { legajo: 0, nombre: '',cursos:[] }; // Inicializa el objeto docente
  mensaje: string = ''; // Para mostrar mensajes al usuario

  isDropdownOpen = false; // Estado del dropdown
  isDropdownCursoOpen = false; // Estado del dropdown para docente del curso

  constructor(private docenteService: DocenteService) { }

  ngOnInit(): void {
    //this.loadAllDocentes(); // Cargar todos los docentes al inicializar
  }

  // Método para cargar todos los docentes
  loadAllDocentes(): void {
    this.docenteService.getAll().subscribe({
      next: (data) => {
        this.docentes = data; // Asignar los datos recibidos a la variable docentes
      },
      error: (error) => {
        console.error('Error al cargar todos los docentes:', error);
        this.errorMessage = 'No se pudieron cargar los docentes.';
      }
    });
  }

  // Método para cargar un docente por ID
  loadDocenteById(id: number): void {
    this.docenteService.getById(id).subscribe({
      next: (data) => {
        this.docente = data; // Asignar el docente recibido a la variable docente
      },
      error: (error) => {
        console.error('Error al cargar el docente por ID:', error);
        this.errorMessage = 'No se pudo cargar el docente.';
      }
    });
  }

    // Método para guardar el nuevo docente
    guardarDocente(): void {
      this.docenteService.guardarDocente(this.nuevoDocente).subscribe({
        next: (data) => {
          this.mensaje = 'Docente guardado exitosamente!';
          this.nuevoDocente = { legajo: 0, nombre: '',cursos:[] }; // Reiniciar formulario
        },
        error: (error) => {
          console.error('Error al guardar el docente:', error);
          this.mensaje = 'Error al guardar el docente.';
        }
      });
    }

 // Método para eliminar un docente
 eliminarDocente(): void {
  if (!this.docenteId) {
    this.errorMessage = 'Por favor, ingrese un ID de docente válido.';
    return;
  }

  this.docenteService.eliminarDocente(this.docenteId).subscribe({
    next: (data) => {
      this.mensaje = 'Docente eliminado exitosamente!';
      this.docenteId = 0; // Reiniciar ID del docente
    },
    error: (error) => {
      console.error('Error al eliminar al docente:', error);
      this.errorMessage = 'Error al eliminar al docente. Detalles: ' + error.message;
    }
  });
}

}
