import { Ventas } from './../../models/Ventas';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Clientes } from 'src/app/models/Clientes';
import { ClientesService } from 'src/app/services/clientes.service';
import { VentasService } from 'src/app/services/ventas.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Productos } from 'src/app/models/Productos';
import { ProductosService } from 'src/app/services/productos.service';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss',
  providers:[MessageService]
})
export class VentasComponent implements OnInit {
        ventas:Ventas[] = [];
        venta: Ventas = new Ventas;
        clientes:Clientes[] = [];
/*         cliente: Clientes =new Clientes;
 */
        productos : Productos[] = [];
        clientesFiltrados: any[] =[];

        ventasDialog = false;

        modalEliminacionVenta = false;
        deleteVentasDialog = false;
        operacion: string = '';
        formulario: FormGroup;

        detalleVentas: any[] = []

        isDisable  : boolean = true;
        precioProducto : any = 0;
        subtotal : any = 0;

        constructor(
            private _ventasService: VentasService,
            private _messageService: MessageService,
            private _clientesService: ClientesService,
            private _productosService: ProductosService
        ){
            this.formulario = new FormGroup({
                fecha  : new FormControl(),
                total  : new FormControl(),
                clienteId  : new FormControl(),
                productoId : new FormControl(),
                subtotal : new FormControl(),
                cantidad : new FormControl()
            })
        }
        ngOnInit(): void {
            this.cargarDatos();
        }

        abrirDialog(){
            this.operacion = "Nuevo";
            this.ventasDialog = true;
            this.formulario.reset();
            this.cargarClientes();
            this.cargarProductos();
        }

        cargarDatos(){
            this._ventasService.obtener().subscribe( dato => {
                this.ventas = dato
            })
        }
        cargarClientes(){
            this._clientesService.obtener().subscribe( dato=>{
                this.clientes = dato
            })
        }
        cargarProductos(){
            this._productosService.obtener().subscribe( dato=>{
                this.productos = dato
            })
        }
        guardar(){

            this.venta.Fecha = this.formulario.value.fecha;
            this.venta.Total = this.formulario.value.total;
            this.venta.ClienteId = this.formulario.value.clienteId;

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
        clientesFiltro(event: AutoCompleteCompleteEvent){
            let filtrados : any[] = [];
            let query = event.query;

            for (let i=0; i < (this.clientes as any[]).length; i++) {
                let cliente =(this.clientes as any[])[i];
                if(cliente.nombres.toLowerCase().indexOf(query.toLowerCase()) == 0){
                    filtrados.push(cliente)
                }
            }
            this.clientesFiltrados=filtrados
        }
        agregarDetalle(){
            this.detalleVentas.push(this.formulario.value)
            console.log(this.detalleVentas);
        }
        calcularSubtotal(){
            this.subtotal = this.precioProducto * this.formulario.value.cantidad;
            this.formulario.value.subtotal = this.subtotal
            this.formulario.patchValue({subtotal:this.subtotal})
        }
        eliminarDetalle(detalleVentas){
            const index = this.detalleVentas.findIndex(
                det=>det.id === detalleVentas.id
            );
            if(index !== -1){
                this.detalleVentas.splice(index,1)
            }
        }
}
