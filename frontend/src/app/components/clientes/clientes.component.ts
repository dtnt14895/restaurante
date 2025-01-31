import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Clientes } from 'src/app/models/Clientes';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
  providers: [MessageService]
})
export class ClientesComponent implements OnInit{
    clientes:Clientes [] = [];
    cliente: Clientes = new Clientes;
    cols = [];
    clientesDialog = false;
    modalEliminacionCliente = false;
    deleteProductsDialog = false;
    operacion: string = '';
    formulario: FormGroup;

    constructor(
        private _messageService: MessageService,
        private _clientesService: ClientesService
    ){
        this.formulario = new FormGroup({
            nombre: new FormControl('',[Validators.minLength(2),Validators.required]),
            apellido: new FormControl,
            correo: new FormControl('',[Validators.email]),
            direccion: new FormControl,
            telefono: new FormControl('',[Validators.required, Validators.pattern(/^\d{7,8}$/)])
        })
    }

    ngOnInit(): void {
        this.cargarDatos();
    }

    abrirDialog(){
        this.operacion = "Nuevo";
        this.clientesDialog = true;
        this.formulario.reset();
    }

    cargarDatos(){
        this._clientesService.obtener().subscribe( dato => {
            this.clientes = dato
        })
    }

    guardar(){
        this.cliente.Nombre = this.formulario.value.nombre;
        this.cliente.Apellido = this.formulario.value.apellido;
        this.cliente.Direccion = this.formulario.value.direccion;
        this.cliente.Correo = this.formulario.value.correo;
        this.cliente.Telefono = this.formulario.value.telefono;

        if(this.operacion == "Nuevo"){
            this._clientesService.guardar(this.cliente).subscribe( dato => {
                this.cargarDatos();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Cliente Nuevo', life:3000 });
        } else{
            this._clientesService.actualizar(this.cliente).subscribe( dato => {
                this.cargarDatos();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Cliente Actualizado', life:3000 });
        }

        this.clientesDialog = false;
        this.formulario.reset();
    }

    ocultar(){
        this.formulario.reset();
        this.clientesDialog = false;
    }

    feliminar(cliente){
        this.cliente.ClienteId = cliente.clienteId;
        this.cliente.Nombre = cliente.nombre;
        this.cliente.Apellido = cliente.apellido;

        this.modalEliminacionCliente = true;
    }

    eliminar(id){
        this.modalEliminacionCliente = false;
        this._clientesService.eliminar(id).subscribe(dato =>{
            this.cargarDatos();
        });
        this._messageService.add({ severity: 'warn', summary: 'Correcto', detail: 'Cliente eliminado', life:3000 });
    }
    editarCliente(cliente){
        this.cliente.ClienteId = cliente.clienteId;
        this.operacion = "Editar";
        this.clientesDialog = true;
        this.formulario.patchValue({
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            correo: cliente.correo,
            direccion: cliente.direccion,
            telefono: cliente.telefono
        })
    }
}
