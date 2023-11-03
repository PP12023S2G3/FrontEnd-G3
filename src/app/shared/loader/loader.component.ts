import { Component } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  loading: boolean = false;
  constructor(private loaderService: LoaderService) {
    this.loaderService.getIsLoading().subscribe((isLoading) => {
      this.loading = isLoading;
    });
  }

  updateIsLoading(val: boolean) {
    this.loaderService.updateIsLoading(val);
  }

}
