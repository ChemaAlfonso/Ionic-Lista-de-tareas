import { ListaItem } from './Lista-item.model';


export class Lista{

    id: number;
    titulo: string;
    creadaEn: Date;
    completadaEn: Date;
    completada: boolean;
    items: ListaItem[];


    constructor( titulo: string ){

        this.titulo = titulo;
        this.creadaEn = new Date();
        this.completada = false;
        this.items = [];

        // Asignamos id unico (Preferible en BBDD)
        this.id = new Date().getTime();

    }


}