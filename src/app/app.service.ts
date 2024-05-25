import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public innerWidth: WritableSignal<number>;
  constructor() {
    this.innerWidth = signal(window.innerWidth);
  }
}
