import { Routes } from '@angular/router';
import { AlumnoComponent } from './components/alumno/alumno.component'; // Ajusta la ruta según tu estructura
import { CursoComponent } from './components/curso/curso.component'; // Ajusta la ruta según tu estructura
import { DocenteComponent } from './components/docente/docente.component'; // Ajusta la ruta según tu estructura
import { TemaComponent } from './components/tema/tema.component'; // Ajusta la ruta según tu estructura

export const routes: Routes = [
  { path: 'alumno', component: AlumnoComponent }, // Cambiado a 'alumno'
  { path: 'cursos', component: CursoComponent },
  { path: 'docentes', component: DocenteComponent },
  { path: 'temas', component: TemaComponent },
  { path: '', redirectTo: '/alumno', pathMatch: 'full' }, // Redirigir a 'alumno' por defecto
];
