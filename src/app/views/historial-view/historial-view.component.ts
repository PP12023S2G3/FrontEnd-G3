import { Component, OnInit, untracked } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from 'src/app/services/result/result.service';
import {MessageService} from 'primeng/api';
import { UserAccountService } from 'src/app/services/userAccount/userAccount.service';
import { Location } from '@angular/common';
import { LoaderService } from 'src/app/shared/loader/loader.service';

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

  constructor(private location: Location, private messageService: MessageService,private userAccountService: UserAccountService,private resultService: ResultService, private router: Router, private loaderService:LoaderService) {
    this.dateTime.setDate(this.dateTime.getDate());
    this.IdRole = this.userAccountService.roleId;
    this.IdUser = this.userAccountService.userId;
  }

  ngOnInit(): void {
    this.loaderService.updateIsLoading(true);
    this.getRecordAll();
    const hasReloaded = localStorage.getItem('hasReloaded');
    if (!hasReloaded) {
      localStorage.setItem('hasReloaded', 'true');
      location.reload();
    }
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
    } 
    else {
      this.filteredData = this.records;
    }
  }

  formatDateToString(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  clearFilter() {
    this.isFilter = false;
    this.rangeDates = undefined;
    this.filteredData = this.records;
  }

  private getRecordAll() {
    this.resultService.getRecordAll(this.IdUser,this.IdRole).subscribe({
      next: (res) => {
        this.records=res.historial;
        this.loaderService.updateIsLoading(false);
      },
      error: (error: { message: any }) => {
        this.messageService.add({
          severity: 'error',
          summary: error.message,
          life: 2000,
        });
        this.loaderService.updateIsLoading(false);
      }
    });
  }
  getRecord(id_diagnostico:number) {
    localStorage.setItem('idResult', JSON.stringify(id_diagnostico));
    this.router.navigate(['/result']);
  }
}