import { Component, OnInit } from '@angular/core';
import { PendientesService } from 'src/app/services/pendientes.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/Lista.model';
import { ListaItem } from 'src/app/models/Lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem: string = '';

  constructor( private pendientesService: PendientesService,
               private route: ActivatedRoute ) { 

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

}
