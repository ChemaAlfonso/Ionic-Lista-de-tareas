import { Component, OnInit } from '@angular/core';
import { PendientesService } from 'src/app/services/pendientes.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/Lista.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;

  constructor( private pendientesService: PendientesService,
               private route: ActivatedRoute ) { 

    const listaId = this.route.snapshot.paramMap.get('id');
    this.lista = this.pendientesService.cargarLista( listaId );

    console.log(this.lista);

  }

  ngOnInit() {
  }

}
