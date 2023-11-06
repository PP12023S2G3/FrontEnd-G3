import { Component, untracked } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-historial-view',
  templateUrl: './historial-view.component.html',
  styleUrls: ['./historial-view.component.css']
})

export class HistorialViewComponent{

    tituloDinamico = 'Historial';
    calendarIcon = 'pi pi-calendar';
    filteredData: any[] = [];
    isFilter = false;
    cambiarTitulo(nuevoTitulo: string) {
    this.tituloDinamico = nuevoTitulo;
  }

    rangeDates: Date[] | undefined;
    value: string | undefined;

    records: any[]=[];

    dateTime = new Date();
    constructor(private resultService: ResultService, private router: Router) {
        this.getRecordAll();
        this.dateTime.setDate(this.dateTime.getDate());
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
            error: (error) => {
              // Manejar errores aquí
            }
          });
    }
    getRecord(id_diagnostico:number) {
        this.resultService.getRecord(id_diagnostico,localStorage.getItem("role")||"").subscribe({
            next: (res) => {
              localStorage.setItem('idResult', JSON.stringify(res.id));
              this.router.navigate(['/result']);
            },
            error: (error) => {
              // Manejar errores aquí
            }
          });
    }

}
