// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private isLoading = new BehaviorSubject<boolean>(false);

  getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  updateIsLoading(val: boolean) {
    this.isLoading.next(val);
  }
}
