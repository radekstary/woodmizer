import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  public isRoot: WritableSignal<boolean> = signal(true);
  constructor() {}
}
