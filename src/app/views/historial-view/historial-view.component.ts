import { Component, OnInit, untracked } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from 'src/app/services/result/result.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-historial-view',
  templateUrl: './historial-view.component.html',
  styleUrls: ['./historial-view.component.css'],
  providers: [MessageService],
})

export class HistorialViewComponent implements OnInit {

    tituloDinamico = 'Historial';
    calendarIcon = 'pi pi-calendar';
    filteredData: any[] = [];
    isFilter = false;
    cambiarTitulo(nuevoTitulo: string) {
    this.tituloDinamico = nuevoTitulo;
  }

    rangeDates: Date[] | undefined;
    value: string | undefined;

    records: any;

    dateTime = new Date();
    constructor(private messageService: MessageService,private resultService: ResultService, private router: Router) {
        this.getRecordAll();
        this.dateTime.setDate(this.dateTime.getDate());
    }
  ngOnInit(): void {
    this.getRecordAll();
  }
    applyDateFilter() {
      if (this.rangeDates) {
        this.isFilter = true;
        const startDate = this.rangeDates[0];
        const endDate = this.rangeDates[1];

        this.filteredData = this.records.filter((item: any) => {
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= endDate;
        });
      } else {
        this.filteredData = this.records;
      }
    }

    clearFilter() {
      this.isFilter = false;
      this.rangeDates = undefined; // Limpia el rango de fechas (si estás usando rangeDates)
      this.filteredData = this.records; // Restablece los datos filtrados
    }

    private getRecordAll() {
      //:TODO este rol y id de usuario esta harcodeado
        this.resultService.getRecordAll("234",'1').subscribe({
            next: (res) => {
              this.records=res.historial;
            },
            error: (error: { message: any }) => {
              console.log(error);
              this.messageService.add({
                severity: 'error',
                summary: error.message,
                life: 2000,
              });
            }
          });
    }
    getRecord(id_diagnostico:number) {
      localStorage.setItem('idResult', JSON.stringify(id_diagnostico));
      this.router.navigate(['/result']);
    }

}
