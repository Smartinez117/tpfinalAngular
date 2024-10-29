import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { CursoComponent } from './components/curso/curso.component';
import { DocenteComponent } from './components/docente/docente.component';
import { TemaComponent } from './components/tema/tema.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlumnoComponent, CursoComponent, DocenteComponent, TemaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class AppComponent {
  title = 'frontEnd';
}
