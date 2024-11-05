import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemaService } from '../../services/tema.service';
import { Tema } from '../../models/tema.model';

@Component({
  selector: 'app-tema',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent {
  temas: Tema[] = [];
  tema!: Tema;
  errorMessage = '';

  nuevoTema: Tema = { nombre: '', descripcion: '', cursos: [] };
  mensaje = '';

  legajo: number | null = null; // Legajo del tema a modificar
  temaId = 0;
  isDropdownOpen = false;
  temaModificar!:number;

  constructor(private temaService: TemaService) {}

  ngOnInit(): void {
    this.loadAllTemas();
  }

  loadAllTemas(): void {
    this.temaService.getAll().subscribe({
      next: data => this.temas = data,
      error: error => this.handleError('No se pudieron cargar los temas.', error)
    });
  }

  loadTemaById(id: number): void {
    this.temaService.getById(id).subscribe({
      next: data => this.tema = data,
      error: error => this.handleError('No se pudo cargar el tema.', error)
    });
  }

  guardarOActualizarTema(): void {
    if (this.legajo) {
      this.modificarTema();
    } else {
      this.guardarTema();
    }
  }

  guardarTema(): void {
    this.temaService.guardarTema(this.nuevoTema).subscribe({
      next: () => {
        this.mensaje = 'Tema guardado exitosamente!';
        this.resetNuevoTema();
      },
      error: error => this.handleError('Error al guardar el tema.', error)
    });
  }

  modificarTema(): void {
    if (!this.legajo || !this.nuevoTema.nombre || !this.nuevoTema.descripcion) {
      this.errorMessage = 'Por favor, ingrese un legajo, un nombre y una descripción válidos.';
      return;
    }

    this.temaService.modificarTema(this.legajo, this.nuevoTema.nombre, this.nuevoTema.descripcion).subscribe({
      next: () => {
        this.mensaje = 'Datos del tema modificados exitosamente!';
        this.resetNuevoTema();
        this.legajo = null; // Reiniciar legajo
      },
      error: error => this.handleError('Error al modificar los datos.', error)
    });
  }

  eliminarTema(): void {
    console.log(this.temaModificar);

    if (this.temaModificar<=0) {
      this.errorMessage = 'Por favor, ingrese un ID de tema válido.';
      return;
    }

    this.temaService.eliminarTema(this.temaModificar).subscribe({
      next: () => {
        this.mensaje = 'Tema eliminado exitosamente!';
        this.temaModificar = 0; // Reiniciar ID del tema
      },
      error: error => this.handleError('Error al eliminar el tema.', error)
    });
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorMessage = message;
  }

  private resetNuevoTema(): void {
    this.nuevoTema = { nombre: '', descripcion: '', cursos: [] }; // Reiniciar formulario
    this.legajo = null; // Reiniciar legajo
    this.temaId = 0;
  }
}
