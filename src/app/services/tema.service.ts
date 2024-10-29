import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//importo los modelos
import { Tema } from '../models/tema.model';//importo el modelo de tema

//obtener todos los temas
const baseUrl= 'http://localhost:8080/api/v1/temas/';//obtener temas

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  // Método para obtener todos los temas
  public getAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(baseUrl);
  }

  // Método para obtener un tema por ID
  public getById(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${baseUrl}${id}`);
  }
  //uso de post
  public guardarTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(baseUrl+ 'guardar' , tema);
  }


  // Método para modificar los datos de un tema
  public modificarTema(legajo: number, nombre: string, descripcion: string): Observable<any> {
    const body = {
      nombre: nombre, // Nuevo nombre del tema
      descripcion: descripcion // Nueva descripción del tema
    };

    return this.http.put<any>(`${baseUrl}/${legajo}`, body);
  }


  // Método para eliminar un tema
  public eliminarTema(temaId: number): Observable<any> {
    return this.http.delete<any>(`${baseUrl}/${temaId}`);
  }


}
