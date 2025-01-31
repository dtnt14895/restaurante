import { Ventas } from './../../models/Ventas';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss',
  providers:[MessageService]
})
export class VentasComponent implements OnInit {
        ventas:Ventas[] = [];
        venta: Ventas = new Ventas;
        ventasDialog = false;
        modalEliminacionVenta = false;
        deleteVentasDialog = false;
        operacion: string = '';
        formulario: FormGroup;
        constructor(
            private _ventasService: VentasService,
            private _messageService: MessageService
        ){

        }
        ngOnInit(): void {
            this.cargarDatos();
        }

        abrirDialog(){
            this.operacion = "Nuevo";
            this.ventasDialog = true;
            this.formulario.reset();
        }

        cargarDatos(){
            this._ventasService.obtener().subscribe( dato => {
                this.ventas = dato
            })
        }

        guardar(){
            this.venta.Fecha = this.formulario.value.fecha;
            this.venta.Total = this.formulario.value.total;

            if(this.operacion == "Nuevo"){
                this._ventasService.guardar(this.venta).subscribe( dato => {
                    this.cargarDatos();
                });
                this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Venta Nuevo', life:3000 });
            } else{
                this._ventasService.actualizar(this.venta).subscribe( dato => {
                    this.cargarDatos();
                });
                this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Venta Actualizado', life:3000 });
            }

            this.ventasDialog = false;
            this.formulario.reset();
        }

        ocultar(){
            this.formulario.reset();
            this.ventasDialog = false;
        }

        feliminar(venta){
            this.venta.VentaId = venta.ventaId;

            this.modalEliminacionVenta = true;

        }

        eliminar(id){
            this.modalEliminacionVenta = false;
            this._ventasService.eliminar(id).subscribe(dato =>{
                this.cargarDatos();
            });
            this._messageService.add({ severity: 'warn', summary: 'Correcto', detail: 'Venta eliminado', life:3000 });
        }

        editarVenta(venta){
            this.venta.VentaId = venta.ventaId;
            this.operacion = "Editar";
            this.ventasDialog = true;
            this.formulario.patchValue({
                fecha: venta.fecha,
                total: venta.total,
            })
        }
}
