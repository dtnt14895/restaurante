import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ventas } from '../models/Ventas';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
    ruta = `${environment.rutaBackend}/api/Venta`;
    constructor(private _httpVenta:HttpClient) { }
    obtener(): Observable<any> {
        return this._httpVenta.get<Ventas>(this.ruta);
    }

    guardar(cliente: Ventas): Observable<any> {
        return this._httpVenta.post<void>(this.ruta,cliente);
    }

    eliminar(id:number): Observable<any>{
        return this._httpVenta.delete<any>(this.ruta + '/'+id);
    }

    actualizar(cliente: Ventas): Observable<any>{
        return this._httpVenta.put<void>(this.ruta, cliente);
    }
}
