import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/productos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  producto: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {
    this.http.get('https://angular-html-3afaa.firebaseio.com/productos_idx.json')
    .subscribe( (resp: any[]) => {
      // console.log(resp);

      this.producto = resp;

      // setTimeout(() => {
      //   this.cargando = false;
      // }, 2000);

      this.cargando = false;
    }
    );
  }


}
