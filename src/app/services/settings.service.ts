import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  theme: SettingsInterface = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private document) {
    this.load();
  }


  save() {
    localStorage.setItem('settings', JSON.stringify(this.theme));
  }

  load() {
    if (localStorage.getItem('settings')) {
      this.theme = JSON.parse(localStorage.getItem('settings'));
    }
    this.applySettings(this.theme.tema);
  }
  applySettings(color: string) {
    const url = `assets/css/colors/${color}.css`;
    this.document.getElementById('tema').setAttribute('href', url);
    this.theme.tema = color;
    this.theme.temaUrl = url;
    this.save();
  }
}

interface SettingsInterface {
  temaUrl: string;
  tema: string;
}
