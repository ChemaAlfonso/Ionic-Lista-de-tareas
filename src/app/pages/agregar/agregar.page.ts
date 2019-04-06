import { Component, OnInit, ViewChild } from '@angular/core';
import { PendientesService } from 'src/app/services/pendientes.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/Lista.model';
import { ListaItem } from 'src/app/models/Lista-item.model';
import { AlertController, IonItem, IonList } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  @ViewChild( 'task' ) tareas: IonList;
  lista: Lista;
  nombreItem: string = '';

  constructor( private pendientesService: PendientesService,
               private route: ActivatedRoute,
               private alertCtrl: AlertController ) { 

    const listaId = this.route.snapshot.paramMap.get('id');
    this.lista = this.pendientesService.cargarLista( listaId );
  }

  ngOnInit() {
  }

  agregarItem(){
    if ( this.nombreItem.length === 0 ){
      return;
    }

    const nuevoItem = new ListaItem( this.nombreItem );
    this.lista.items.push( nuevoItem );

    this.nombreItem = '';
    this.pendientesService.setStorage();

  }

  cambioCheck( item: ListaItem ){
    const pendientes = this.lista.items.filter( itemData => !itemData.completado ).length;

    if ( pendientes === 0 ){
       this.lista.completadaEn = new Date();
       this.lista.completada = true;
    } else {
      this.lista.completadaEn = null;
      this.lista.completada = false;
    }

      this.pendientesService.setStorage();
  }

  delete( i: number ){
    this.lista.items.splice( i, 1 );
    this.pendientesService.setStorage();
  }

  async editTask( i: number ){
    let tarea = this.lista.items[i];

    const alert = await this.alertCtrl.create({
      header: 'Editar tarea',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: tarea.desc,
          value: tarea.desc
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // Cerrar slide automático
            this.tareas.closeSlidingItems();
          }
        },
        {
          text: 'Editar',
          handler: ( data ) => {
            if ( data.titulo.length === 0 ){
              return;
            }
    
            this.lista.items[i].desc = data.titulo;
            this.pendientesService.setStorage();
            
            // Cerrar slide automático
            this.tareas.closeSlidingItems();
    
          }
        }
      ]
    });

    alert.present();
  }

}
