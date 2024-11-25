import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosComponent } from './pedidos/pedidos.component';
import { DeudasComponent } from './deudas/deudas.component';
import { AgregarPedidosComponent } from './pedidos/agregar-pedidos/agregar-pedidos.component';
import { EliminarPedidosComponent } from './eliminar-pedidos/eliminar-pedidos.component';
import { AgregarDeudaComponent } from './agregar-deuda/agregar-deuda.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'pedidos', component: PedidosComponent, canActivate: [AuthGuard] },
  { path: 'deudas', component: DeudasComponent, canActivate: [AuthGuard] },
  { path: 'agregar-pedidos', component: AgregarPedidosComponent, canActivate: [AuthGuard] },
  { path: 'eliminar-pedidos', component: EliminarPedidosComponent, canActivate: [AuthGuard] },
  { path: 'agregar-deuda', component: AgregarDeudaComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/pedidos', pathMatch: 'full' }, // Redirigir al login por defecto
  { path: '**', redirectTo: '/pedidos', pathMatch: 'full' }  // Redirigir rutas no encontradas a Login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
