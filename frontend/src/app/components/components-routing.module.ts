import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m=>m.ClientesModule)},
    { path: 'ventas', loadChildren: () => import('./ventas/ventas.module').then(m=>m.VentasModule)},
    { path: 'productos', loadChildren: () => import('./productos/productos.module').then(m=>m.ProductosModule)},
    { path: 'login', loadChildren: () => import('./login/login.module').then(m=>m.LoginModule)},
  ])],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
