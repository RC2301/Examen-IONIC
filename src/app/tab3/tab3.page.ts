import { Component, OnInit } from '@angular/core';
import { productos } from '../../assets/data/productos';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  carrito: Array<any>=[];
  data: any;
  productoEn: any;
  producto:any;
  subtotal=0;
  iva=0;
  totalaPagar=0;
  nP = 0;

  constructor() {}


  ngOnInit(): void {


  }

  cargarCarrito(){
    this.data = JSON.parse(localStorage.getItem('producto'));
    let preciototal;
    for (let i = 0; i < this.data.length; i++) {
      this.productoEn = productos.productosItems.find(producto => producto.id == this.data[i].id);
      const unidades = Number(this.data[i].unidades);
      const nombre = this.productoEn.nombre;
      const precio = this.productoEn.precio;
      preciototal = precio * unidades;
      this.subtotal = this.subtotal + preciototal;
      this.producto = {nombre,precio,preciototal,unidades};

      this.carrito.push(this.producto);
    }
    this.iva = this.subtotal * 0.12;
    this.totalaPagar = this.subtotal + this.iva;
    
  }
  
ionViewDidEnter(){
  this.carrito = [];
  if (localStorage.getItem('producto')) {
    this.cargarCarrito();
  }
    
}

}
