import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { DeudasComponent } from './deudas/deudas.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AgregarPedidosComponent } from './pedidos/agregar-pedidos/agregar-pedidos.component';
import { EliminarPedidosComponent } from './eliminar-pedidos/eliminar-pedidos.component';
import { AgregarDeudaComponent } from './agregar-deuda/agregar-deuda.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    PedidosComponent,
    DeudasComponent,
    NavComponent,
    AgregarPedidosComponent,
    EliminarPedidosComponent,
    AgregarDeudaComponent,
    LoginComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Duración de la notificación
      positionClass: 'toast-top-right', // Posición de la notificación
      preventDuplicates: true, // Evita duplicados
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
