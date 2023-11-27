import { Component, OnInit, HostListener  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const toolbar = document.querySelector('.toolbar') as HTMLElement | null;
    if (toolbar && window.scrollY > toolbar.offsetTop) {
      toolbar.classList.add('sticky');
    } else if (toolbar) {
      toolbar.classList.remove('sticky');
    }
  }
}
