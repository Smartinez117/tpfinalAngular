import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//importo los modelos
import { Alumno } from '../models/alumno.model';//modelo de alumno

//obtener todos los alumnos.
const baseUrl= 'http://localhost:8080/api/v1/alumnos/';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) { }

  // Método para obtener los alumnos de un curso específico
  public getAlumnosPorCurso(cursoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${baseUrl}${cursoId}/alumnos`);
  }

  // Método para obtener todos los alumnos
  public getAll(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(baseUrl);
  }

  // Método para obtener un alumno por ID
  public getById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${baseUrl}${id}`);
  }
  //------------------------------uso de post----------------------------------
 // Método para guardar un nuevo alumno
  public guardarAlumno(alumno: Alumno): Observable<Alumno> {


    return this.http.post<Alumno>(baseUrl+ 'guardar', alumno);
  }

    // Método para actualizar un alumno
  public actualizarAlumno(alumno: Alumno): Observable<any> {
    return this.http.put<any>(`${baseUrl}${alumno.id}`, alumno);
  }


    // Método para inscribir a un alumno en varios cursos
    public inscribirseCurso(alumnoId: number, cursoIds: number[]): Observable<any> {
      const body = {
        cursoIds: cursoIds // Lista de IDs de los cursos
      };

      return this.http.post<any>(`${baseUrl}/${alumnoId}/inscribirseCurso`, body);
    }

      // Método para eliminar un alumno
  public eliminarAlumno(alumnoId: number): Observable<any> {
    return this.http.delete<any>(`${baseUrl}${alumnoId}`);
  }

}
