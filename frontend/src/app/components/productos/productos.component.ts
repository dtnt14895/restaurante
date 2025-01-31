import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Productos } from 'src/app/models/Productos';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
  providers: [MessageService]
})
export class ProductosComponent implements OnInit{
    productos:Productos [] = [];
    producto: Productos = new Productos;
    cols = [];
    productosDialog = false;
    modalEliminacionProducto = false;
    deleteProductsDialog = false;
    operacion: string = '';
    formulario: FormGroup;

    constructor(
        private _messageService: MessageService,
        private _productosService: ProductosService
    ){
        this.formulario = new FormGroup({
            nombre: new FormControl,
            precio: new FormControl('',[Validators.pattern('^[0-9]*$')]),
            stock: new FormControl('',[Validators.pattern('^[0-9]*$')]),
            descripcion: new FormControl
        })
    }

    ngOnInit(): void {
        this.cargarDatos();
    }

    abrirDialog(){
        this.operacion = "Nuevo";
        this.productosDialog = true;
        this.formulario.reset();
    }

    cargarDatos(){
        this._productosService.obtener().subscribe( dato => {
            this.productos = dato
        })
    }

    guardar(){
        this.producto.Nombre = this.formulario.value.nombre;
        this.producto.Precio = this.formulario.value.precio;
        this.producto.Stock = this.formulario.value.stock;
        this.producto.Descripcion = this.formulario.value.descripcion;
        if(this.operacion == "Nuevo"){
            this._productosService.guardar(this.producto).subscribe( dato => {
                this.cargarDatos();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Producto Nuevo', life:3000 });
        } else{
            this._productosService.actualizar(this.producto).subscribe( dato => {
                this.cargarDatos();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Producto Actualizado', life:3000 });
        }

        this.productosDialog = false;
        this.formulario.reset();
    }

    ocultar(){
        this.formulario.reset();
        this.productosDialog = false;
    }

    feliminar(producto){
        this.producto.ProductoId = producto.productoId;
        this.producto.Descripcion = producto.descripcion;
        this.producto.Stock = producto.stock;
        this.producto.Precio = producto.precio;

        this.modalEliminacionProducto = true;

    }

    eliminar(id){
        this.modalEliminacionProducto = false;
        this._productosService.eliminar(id).subscribe(dato =>{
            this.cargarDatos();
        });
        this._messageService.add({ severity: 'warn', summary: 'Correcto', detail: 'Producto eliminado', life:3000 });
    }

    editarProducto(producto){
        this.producto.ProductoId = producto.productoId;
        this.operacion = "Editar";
        this.productosDialog = true;
        this.formulario.patchValue({
            nombre: producto.nombre,
            precio: producto.precio,
            stock: producto.stock,
            descripcion: producto.descripcion
        })
    }
}
