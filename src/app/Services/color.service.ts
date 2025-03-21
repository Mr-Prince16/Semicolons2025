import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  // private darkModeSubject = new BehaviorSubject<boolean>(false);
  private colorblindModeSubject = new BehaviorSubject<string>('Rain-default');
  private textColorSubject = new BehaviorSubject<string>('text-white');
  // darkMode$ = this.darkModeSubject.asObservable();
  colorblindMode$ = this.colorblindModeSubject.asObservable();
     textColor$ = this.textColorSubject.asObservable();
  // toggleDarkMode() {
  //   const newMode = !this.darkModeSubject.value;
  //   this.darkModeSubject.next(newMode);
  //   document.documentElement.classList.toggle('dark', newMode); // Tailwind dark mode support
  // }

  setColorblindMode(mode: string) {
    this.colorblindModeSubject.next(mode);
    document.documentElement.className = mode;
    this.setTextColor(mode);
    // Set class for colorblind styles
  }
  setTextColor(mode: string) {
    const textColors: { [key: string]: string } = {
      'Normal-Condition': 'text-gray-900',
      'Protanopia': 'text-green-500',
      'Deuteranopia': 'text-orange-700',
      'Tritanopia': 'text-purple-900',
      'Achromatopsia': 'text-gray-600'
    };
    this.textColorSubject.next(textColors[mode] || 'text-white') ;
  }
}
