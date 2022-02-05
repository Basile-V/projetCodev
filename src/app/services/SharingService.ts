import { Injectable } from '@angular/core';

@Injectable()
export class SharingService {

  constructor() { }

  setSettings(storageName: string, data: any) {
    localStorage.setItem(storageName, JSON.stringify(data));
  }

  getUserSettings(storageName: string) {
    let data = localStorage.getItem(storageName);
    return JSON.parse(<string>data);
  }

  clearUserSettings(storageName: string,) {
    localStorage.removeItem(storageName);
  }

  cleanAll() {
    localStorage.clear()
  }

}
