import { Component } from '@angular/core';
import { PendientesService } from 'src/app/services/pendientes.service';
import { Lista } from 'src/app/models/Lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public pendientesService: PendientesService,
               private router: Router,
               private alertCtrl: AlertController ){}

  async agregarLista(){
    
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('cancelar');
        }

      },
      {
        text: 'Crear',
        handler: ( data ) => {
          
          if ( data.titulo.length === 0 ){
            return;
          }

          const listaId = this.pendientesService.crearLista( data.titulo );

          // Crear lista
          this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);


        }
      }
    ]
    });

    alert.present();
  }

  listaSeleccionada( lista: Lista ){
    
    console.log(lista);
    // Navegar a la lista;
    this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
  }



}
