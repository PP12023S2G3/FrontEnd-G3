import { Component } from '@angular/core';
import { ResultService } from 'src/app/services/result/result.service';

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
    constructor(private resultService: ResultService) {
        this.getRecordAll();
        this.getRecord();
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
    private getRecordAll() {
        this.resultService.getRecordAll("98","4").subscribe({
            next: (res) => {
              console.log(res);
              localStorage.setItem('records', JSON.stringify(res));

            },
            error: (error) => {
              // Manejar errores aquí
            }
          });
    }
    private getRecord() {
        this.resultService.getRecord(22,"4").subscribe({
            next: (res) => {
              console.log(res);
              localStorage.setItem('record1', JSON.stringify(res));

            },
            error: (error) => {
              // Manejar errores aquí
            }
          });
    }

}
