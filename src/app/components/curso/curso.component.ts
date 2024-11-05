import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso.model';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent implements OnInit {
  cursos: Curso[] = [];
  cursosPorFecha: Curso[] = [];
  curso!: Curso;
  errorMessage = '';

  isDropdownOpen = false;
  isDropdownFechaOpen=false;

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    // Uncomment to load all courses on initialization
    // this.loadAllCursos();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  loadAllCursos(): void {
    this.cursoService.getAll().subscribe({
      next: data => this.cursos = data,
      error: () => this.errorMessage = 'No se pudieron cargar los cursos.'
    });
  }

  loadCursoById(id: number): void {
    this.cursoService.getById(id).subscribe({
      next: data => this.curso = data,
      error: () => this.errorMessage = 'No se pudo cargar el curso.'
    });
  }

  loadCursosPorFecha(fecha: string): void {
    this.cursoService.getCursosPorFechaFinalizacion(fecha).subscribe({
      next: data => this.cursosPorFecha = data,
      error: () => this.errorMessage = 'No se pudieron cargar los cursos que finalizan en esa fecha.'
    });
  }
}
