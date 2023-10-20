import { Component } from '@angular/core';

@Component({
  selector: 'app-historial-view',
  templateUrl: './historial-view.component.html',
  styleUrls: ['./historial-view.component.css']
})

export class HistorialViewComponent{

    tituloDinamico = 'Historial';
    calendarIcon = 'pi pi-calendar';
    cambiarTitulo(nuevoTitulo: string) {
    this.tituloDinamico = nuevoTitulo;
  }

    rangeDates: Date[] | undefined;
    value: string | undefined;

    data: any[];

    dateTime = new Date();
    constructor() {
        this.dateTime.setDate(this.dateTime.getDate());
        this.data = [
            {
                code: '1',
                date: '2023-10-18',
                study: 'Cerebro',
                doctor: 'Pérez',
            },
            {
                code: '2',
                date: '2023-09-18',
                study: 'Cerebro',
                doctor: 'Arroyo',
            },
        ];
    }

}
