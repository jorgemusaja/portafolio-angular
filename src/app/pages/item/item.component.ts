import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoContenido } from 'src/app/interfaces/prod-contenido.interfaces';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoContenido;
  id: string;

  constructor(private route: ActivatedRoute,
              public productoService: ProductosService) { }

  ngOnInit() {
    this.route.params.subscribe(
    parametros => {
    // console.log(parametros.id);

    this.productoService.getProducto(parametros['id']).subscribe(
      (producto: ProductoContenido) => {
        this.id = parametros['id'];
        this.producto = producto;
        // console.log(producto);
      }
    );

  }
  );
  }

}
