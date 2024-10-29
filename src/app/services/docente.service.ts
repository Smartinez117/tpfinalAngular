import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//importo los modelos
import { Docente } from '../models/docente.model';//importo el modelo de docente

//obtener todos los docentes
const baseUrl= 'http://localhost:8080/api/v1/docentes/';//obtener docentes

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http: HttpClient) { }
  // Método para obtener todos los docentes
  public getAll(): Observable<Docente[]> {
    return this.http.get<Docente[]>(baseUrl);
  }

  // Método para obtener un docente por ID
  public getById(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${baseUrl}${id}`);
  }

  // Método para guardar un nuevo docente
  public guardarDocente(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(baseUrl + 'guardar', docente);
  }


    // Método para modificar los datos de un docente
    public modificarDocente(legajo: number, nombre: string): Observable<any> {
      const body = {
        nombre: nombre // Nuevo nombre del docente
      };

      return this.http.put<any>(`${baseUrl}/${legajo}`, body);
    }

    // Método para eliminar un docente
    public eliminarDocente(docenteId: number): Observable<any> {
      return this.http.delete<any>(`${baseUrl}/${docenteId}`);
    }

}
