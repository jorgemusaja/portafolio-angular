import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { Producto } from '../interfaces/productos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada = false;

  trabajos: any[] = [];


  constructor( private http: HttpClient ) {

    // console.log('Servicio de infoPagina OK');

    this.cargarInfo();
    this.cargarTrabajos();
  }

  private cargarInfo() {

    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
        }
      );
  }

  private cargarTrabajos() {

    this.http.get('https://angular-html-3afaa.firebaseio.com/.json')
      .subscribe( (resp: Producto[]) => {
      this.trabajos = resp;
        // console.log(resp);
      }
      );

  }

}
