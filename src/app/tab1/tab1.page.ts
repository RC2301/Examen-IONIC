import { Component, OnInit,Injectable } from '@angular/core';
import { productos } from '../../assets/data/productos';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public searchTerm: string = "";
  public items: any;
  products = productos.productosItems;
  productoEn2: any;
  productoEn: any;
  filterTerm: string;
  carrito: Array<any>=[];

  constructor(public alertController: AlertController) {}


  ngOnInit(){

    this.setFilteredItems();
  }
  onClick(id){
    this.productoEn2 = this.products.find(producto => producto.id == id);
    this.presentAlert(this.productoEn2);
  }

  async presentAlert(producto) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: `${producto.nombre}  $${producto.precio}`,
      subHeader: `Unidades ${producto.unidades}`,
      message: `${producto.informacion}`,
      buttons: ['Cancelar', {
        text: 'Comprar',
        handler: () => {
          this.presentAlertPrompt(producto);
        }
      }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  filterItems(searchTerm) {
    return this.products.filter(item => {
      return item.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  setFilteredItems() {
    this.items = this.filterItems(this.searchTerm);
  }

  async presentAlertPrompt(producto) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: `${producto.nombre}: $${producto.precio}`,
      inputs: [
        {
          name: 'unidades',
          type: 'number',
          placeholder: 'Unidades'
        }
      ],
      buttons: [
        'Cancelar', {
          text: 'Añadir al Carrito',
          handler: (dato) => {
            const id = producto.id;
            this.productoEn = this.products.find(producto => producto.id == id);
            const unidadC = Number(dato.unidades);
            const stock = Number(this.productoEn.unidades);
            if (unidadC <= stock) {
              this.carrito.push({id: id,unidades: dato.unidades});
              localStorage.setItem('producto',JSON.stringify(this.carrito));
              this.presentAlert2('Producto Añadido Correctamente');
            } else {
              this.presentAlert2('Las unidades es mayor al stock del producto');
            }
            
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlert2(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  
}
