import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//importo los modelos
import { Curso } from '../models/curso.model';//importo el modelo de curso.

//obtener todos los cursos.
const baseUrl= 'http://localhost:8080/api/v1/cursos/';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http: HttpClient) { }

  // Método para obtener cursos que finalizan en una fecha específica
  public getCursosPorFechaFinalizacion(fecha: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${baseUrl}finalizan/${fecha}`);
  }

  // Método para obtener todos los cursos
  public getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(baseUrl);
  }

  // Método para obtener un curso por ID
  public getById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${baseUrl}${id}`);
  }

 // Método para guardar un nuevo curso
 public crearCurso(temaId: number, curso: Curso, docenteLegajo: number): Observable<any> {

  const body = {
    temaId,
    curso: {
      fecha_inicio: this.formatDate(curso.fechaInicio), // Formato YYYY-MM-DD
      fecha_fin: this.formatDate(curso.fechaFin), // Formato YYYY-MM-DD
      precio: curso.precio
    },
    docenteLegajo
  };
  console.log(temaId);
  console.log(docenteLegajo);
  console.log(curso);

  return this.http.post<any>(`${baseUrl}crearCurso`, body);
}
public formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son 0-indexados
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

  // Método para actualizar un curso
  public actualizarCurso(id: number, fechaInicio: Date, fechaFin: Date, precio: number): Observable<any> {
    console.log("Fecha Inicio:", this.formatDate(fechaInicio));

    return this.http.put<any>(`${baseUrl}${id}`, {
      fechaInicio: this.formatDate(fechaInicio), // Fecha de inicio en formato ISO
      fechaFin: this.formatDate(fechaFin), // Fecha de finalización en formato ISO
      precio: precio, // Precio del curso

    });

  }

  // Método para cambiar el docente de un curso
  public cambiarDocente(cursoId: number, docenteLegajo: number): Observable<any> {
    const body = {
      docenteId: docenteLegajo // ID del nuevo docente
    };

    return this.http.put<any>(`${baseUrl}${cursoId}/cambiarDocente`, body);
  }

  public cambiarTema(cursoId: number, temaId: number): Observable<any> {
    const body = {
      temaId: temaId // ID del nuevo tema
    };

    return this.http.put<any>(`${baseUrl}${cursoId}/cambiarTema`, body);
  }

  // Método para eliminar un curso
  public eliminarCurso(cursoId: number): Observable<any> {
    return this.http.delete<any>(`${baseUrl}${cursoId}`);
  }


}
