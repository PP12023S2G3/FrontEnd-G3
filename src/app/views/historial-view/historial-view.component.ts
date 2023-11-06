import { Component, OnInit, untracked } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from 'src/app/services/result/result.service';
import {MessageService} from 'primeng/api';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';

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
    IdRole: any;
    IdUser: any;
    cambiarTitulo(nuevoTitulo: string) {
    this.tituloDinamico = nuevoTitulo;
  }

    rangeDates: Date[] | undefined;
    value: string | undefined;

    records: any;

    dateTime = new Date();
    constructor(private messageService: MessageService,private userAccountService: UserAccountService,private resultService: ResultService, private router: Router) {
        this.dateTime.setDate(this.dateTime.getDate());
        this.IdRole = this.userAccountService.roleId;
        console.log(this.IdRole);
        this.IdUser = this.userAccountService.userId;
        console.log(this.IdUser);
    }

  ngOnInit(): void {
    this.getRecordAll();
  }

  applyDateFilter() {
    if (this.rangeDates) {
      this.isFilter = true;
      const startDate = this.formatDateToString(this.rangeDates[0]);
      const endDate = this.formatDateToString(this.rangeDates[1]);

      this.filteredData = this.records.filter((item: any) => {
        const itemDate = item.fecha.split(' ')[0];
        return itemDate >= startDate && itemDate <= endDate;
      });
    } else {
      this.filteredData = this.records;
    }
  }

  formatDateToString(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

    clearFilter() {
      this.isFilter = false;
      this.rangeDates = undefined; // Limpia el rango de fechas (si estás usando rangeDates)
      this.filteredData = this.records; // Restablece los datos filtrados
    }

    private getRecordAll() {
      //:TODO este rol y id de usuario esta harcodeado

        this.resultService.getRecordAll(this.IdUser,this.IdRole).subscribe({
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
