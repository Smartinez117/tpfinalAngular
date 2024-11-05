import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { DocenteService } from '../../services/docente.service'; // Ajusta la ruta según tu estructura
import { Docente } from '../../models/docente.model'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  docentes: Docente[] = []; // Para almacenar todos los docentes
  docente!: Docente; // Para almacenar un docente específico
  errorMessage: string = ''; // Para manejar errores
  mensaje: string = ''; // Para mostrar mensajes al usuario

  nuevoDocente: Docente = { legajo: 0, nombre: '', cursos: [] }; // Inicializa el objeto docente
  legajoModificar: number = 0;
  nombreModificar: string = '';
  docenteIdEliminar: number = 0;

  isDropdownOpen = false; // Estado del dropdown

  constructor(private docenteService: DocenteService) {}

  ngOnInit(): void {
    this.loadAllDocentes(); // Cargar todos los docentes al inicializar
  }

  loadAllDocentes(): void {
    this.docenteService.getAll().subscribe({
      next: (data) => this.docentes = data,
      error: () => this.errorMessage = 'No se pudieron cargar los docentes.'
    });
  }

  loadDocenteById(id: number): void {
    this.docenteService.getById(id).subscribe({
      next: (data) => {
        this.docente = data;
        this.legajoModificar = data.legajo; // Cargar legajo para modificación
        this.nombreModificar = data.nombre; // Cargar nombre para modificación
      },
      error: () => this.errorMessage = 'No se pudo cargar el docente.'
    });
  }

  guardarDocente(): void {
    this.docenteService.guardarDocente(this.nuevoDocente).subscribe({
      next: () => {
        this.mensaje = 'Docente guardado exitosamente!';
        this.nuevoDocente = { legajo: 0, nombre: '', cursos: [] }; // Reiniciar formulario
        this.loadAllDocentes(); // Recargar la lista
      },
      error: () => this.errorMessage = 'Error al guardar el docente.'
    });
  }

  modificarDocente(): void {
    if (!this.legajoModificar || !this.nombreModificar) {
      this.errorMessage = 'Por favor, ingrese un legajo y un nombre válidos.';
      return;
    }

    this.docenteService.modificarDocente(this.legajoModificar, this.nombreModificar).subscribe({
      next: () => {
        this.mensaje = 'Datos del docente modificados exitosamente!';
        this.legajoModificar = 0; // Reiniciar legajo
        this.nombreModificar = ''; // Reiniciar nombre
        this.loadAllDocentes(); // Recargar la lista
      },
      error: () => this.errorMessage = 'Error al modificar los datos.'
    });
  }

  eliminarDocente(): void {
    if (!this.docenteIdEliminar) {
      this.errorMessage = 'Por favor, ingrese un ID de docente válido.';
      return;
    }

    this.docenteService.eliminarDocente(this.docenteIdEliminar).subscribe({
      next: () => {
        this.mensaje = 'Docente eliminado exitosamente!';
        this.docenteIdEliminar = 0; // Reiniciar ID del docente
        this.loadAllDocentes(); // Recargar la lista
      },
      error: () => this.errorMessage = 'Error al eliminar al docente.'
    });
  }
}
