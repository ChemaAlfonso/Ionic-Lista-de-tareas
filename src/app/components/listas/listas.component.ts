import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PendientesService } from 'src/app/services/pendientes.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/Lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor( public pendientesService: PendientesService,
               private router: Router,
               private alertCtrl: AlertController ) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ){

    // Navegar a la lista;
    if ( this.terminada ){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrarLista( lista: Lista ){
    this.pendientesService.borrarLista( lista );
  }

  async editLista( lista: Lista ){

    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: lista.titulo,
          value: lista.titulo
        }
      ],
      buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          // Cerrar slide automático
          this.lista.closeSlidingItems();
        }

      },
      {
        text: 'Editar',
        handler: ( data ) => {

          if ( data.titulo.length === 0 ){
            return;
          }

          this.pendientesService.editLista( lista, data );

          // Cerrar slide automático
          this.lista.closeSlidingItems();
        }
      }
    ]
    });

    alert.present();
  }

}
