import { Injectable } from '@angular/core';
import { SessionStorageKey } from './sessionStorage.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  public get(key: SessionStorageKey): string | null {
    return sessionStorage.getItem(key);
  }

  public set(key: SessionStorageKey, value: string): string | null {
    try {
      /*
        TODO:
        encrypt value before saving to localstorage
      */
      sessionStorage.setItem(key, value);
      return value;
    } catch (e) {
      this.handleSessionStorageError(e);
      return null;
    }
  }

  public remove(key: SessionStorageKey): void {
    sessionStorage.removeItem(key);
  }

  handleSessionStorageError(e: any) {
    /*
      TODO:
      handle potential errors while encrypting and saving data to sessionStorage
    */
  }
}
