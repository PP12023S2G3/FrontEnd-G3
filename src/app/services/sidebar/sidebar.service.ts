import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuMedico : any []= [
    { label: 'Historial', link: '/historial' },
    { label: 'Modelos', link: '/modelo' },
    { label: 'Contacto', link: '/contacto' }
  ]

  menuAuditor: any []= [
    { label: 'Informe médico', link: '/diagnostico' },
    { label: 'Historial', link: '/historial' },
    { label: 'Modelos', link: '/modelo' },
    { label: 'Contacto', link: '/contacto' }
  ]

  menuProfDelaSalud: any []= [
    { label: 'Diagnóstico', link: '/diagnostico' },
    { label: 'Modelos', link: '/modelo' },
    { label: 'Contacto', link: '/contacto' }
  ]
}
