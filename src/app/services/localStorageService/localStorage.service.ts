import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../../mockData/users/user.interface';
import { LocalStorageConfig, LocalStorageKey } from './localStorage.interface';
import { LocalStorageInitialConfig } from '../../config/LocalStorageInit.config';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public getConfig(key: LocalStorageKey): LocalStorageConfig {
    let cfgString = localStorage.getItem(key);
    return cfgString ? JSON.parse(cfgString) : this.getInitialConfig(key);
  }

  public updateConfig(
    configKey: LocalStorageKey,
    updates: { key: keyof LocalStorageConfig; value: any }[]
  ): LocalStorageConfig {
    let localStorageConfig = this.getConfig(configKey);
    if (!updates?.length) return localStorageConfig;

    for (const update of updates) {
      const { key, value } = update;
      localStorageConfig[key] = value;
    }

    try {
      const cfgStr = JSON.stringify(localStorageConfig);
      /*
        TODO:
        encrypt string before saving to localstorage
      */
      localStorage.setItem(configKey, cfgStr);
    } catch (e) {
      this.handleLocalStorageError(e);
    }

    return localStorageConfig;
  }

  getInitialConfig(key: LocalStorageKey): LocalStorageConfig | undefined {
    return LocalStorageInitialConfig(key);
  }

  handleLocalStorageError(e: any) {
    /*
      TODO:
      handle potential errors while encrypting and saving data to localstorage
    */
  }
}
