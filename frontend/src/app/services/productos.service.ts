import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Productos } from '../models/Productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
    ruta = `${environment.rutaBackend}/api/Producto`;
    constructor(private _httpProducto:HttpClient) { }
    obtener(): Observable<any> {
        return this._httpProducto.get<Productos>(this.ruta);
    }

    guardar(producto: Productos): Observable<any> {
        return this._httpProducto.post<void>(this.ruta,producto);
    }

    eliminar(id:number): Observable<any>{
        return this._httpProducto.delete<any>(this.ruta + '/'+id);
    }

    actualizar(producto: Productos): Observable<any>{
        return this._httpProducto.put<void>(this.ruta, producto);
    }
}
