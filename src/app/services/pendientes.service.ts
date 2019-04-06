import { Injectable } from '@angular/core';
import { Lista } from '../models/Lista.model';

@Injectable({
  providedIn: 'root'
})
export class PendientesService {

  public listas: Lista[] = [];

  constructor() {

    this.getStorage();

   }

   setStorage(){
      localStorage.setItem('data', JSON.stringify( this.listas ) );
   }

   getStorage(){

    if ( localStorage.getItem('data') ){
      this.listas = JSON.parse( localStorage.getItem('data') );
    } else {
      this.listas = [];
    }

   }

   crearLista( titulo: string ){
    const nuevaLista = new Lista( titulo );
    this.listas.push( nuevaLista );
    this.setStorage();

    return nuevaLista.id;
   }

   borrarLista( lista: Lista ){
    this.listas = this.listas.filter( listaData => listaData.id !== lista.id );
    this.setStorage();
  }

  editLista( lista, data ){
    lista.titulo = data.titulo;
    this.setStorage();
  }

   cargarLista( id: string | number ){
    id = Number(id);

    return this.listas.find( listaData => listaData.id === id );

   }


}
