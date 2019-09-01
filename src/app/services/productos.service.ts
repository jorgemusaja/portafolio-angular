import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/productos.interfaces';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  producto: Producto[] = [];
  productoFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {

    return new Promise( (resolve, reject) => {

      this.http.get('https://angular-html-3afaa.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any[]) => {
      // console.log(resp);

      this.producto = resp;

      // setTimeout(() => {
      //   this.cargando = false;
      // }, 2000);

      this.cargando = false;
      resolve();
    }
    );


    } );
  }

getProducto(id: string) {
  return this.http.get(`https://angular-html-3afaa.firebaseio.com/productos/${id}.json`);

  }

buscarProducto(termino: string) {

  if (this.producto.length === 0) {
    this.cargarProductos().then( () => {
      this.filtrarProductos(termino);

    });
  } else {
    this.filtrarProductos(termino);

  }



}

private filtrarProductos(termino: string) {
  // console.log(this.producto);
  this.productoFiltrado = [];

  termino = termino.toLocaleLowerCase();

  this.producto.forEach( product => {

    const tituloLower = product.titulo.toLocaleLowerCase();

    if (product.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
      this.productoFiltrado.push(product);
    }

  }

  )

}

}
