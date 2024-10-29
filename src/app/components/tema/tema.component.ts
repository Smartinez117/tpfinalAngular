import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { TemaService } from '../../services/tema.service'; // Ajusta la ruta según tu estructura
import { Tema } from '../../models/tema.model'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-tema',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tema.component.html',
  styleUrl: './tema.component.css'
})
export class TemaComponent {
  temas: Tema[] = []; // Para almacenar todos los temas
  tema!: Tema; // Para almacenar un tema específico
  errorMessage: string = ''; // Para manejar errores

  nuevoTema: Tema = { nombre: '', descripcion: '',cursos:[] }; // Inicializa el objeto tema
  mensaje: string = ''; // Para mostrar mensajes al usuario

  isDropdownOpen = false; // Estado del dropdown
  isDropdownCursoOpen = false; // Estado del dropdown para tema

  constructor(private temaService: TemaService) { }

  ngOnInit(): void {
    this.loadAllTemas(); // Cargar todos los temas al inicializar
  }

  // Método para cargar todos los temas
  loadAllTemas(): void {
    this.temaService.getAll().subscribe({
      next: (data) => {
        this.temas = data; // Asignar los datos recibidos a la variable temas
      },
      error: (error) => {
        console.error('Error al cargar todos los temas:', error);
        this.errorMessage = 'No se pudieron cargar los temas.';
      }
    });
  }

  // Método para cargar un tema por ID
  loadTemaById(id: number): void {
    this.temaService.getById(id).subscribe({
      next: (data) => {
        this.tema = data; // Asignar el tema recibido a la variable tema
      },
      error: (error) => {
        console.error('Error al cargar el tema por ID:', error);
        this.errorMessage = 'No se pudo cargar el tema.';
      }
    });
  }

 // Método para guardar el nuevo tema
 guardarTema(): void {
  this.temaService.guardarTema(this.nuevoTema).subscribe({
    next: (data) => {
      this.mensaje = 'Tema guardado exitosamente!';
      this.nuevoTema = { nombre: '', descripcion: '',cursos:[] }; // Reiniciar formulario
    },
    error: (error) => {
      console.error('Error al guardar el tema:', error);
      this.mensaje = 'Error al guardar el tema.';
    }
  });
}
}