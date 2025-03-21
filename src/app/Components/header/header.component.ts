import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ColorService } from '../../Services/color.service';
import { TranslationService } from '../../Services/translate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isSettingsVisible = false;
  isProfileOpen = false;
  private settingsTimeout: any;
  private profileTimeout: any;
  isDarkMode = false;
  currentLanguage = 'en';
  constructor(
    private colorService: ColorService,
    private translationService: TranslationService
  ) {
    // this.colorService.darkMode$.subscribe((mode) => (this.isDarkMode = mode));
    this.translationService.currentLang$.subscribe((lang) => (this.currentLanguage = lang));
  }

  // Toggle Language
  toggleLanguage() {
    this.translationService.switchLanguage();
  }

  // Toggle Dark Mode
  // toggleDarkMode() {
  //   this.colorService.toggleDarkMode();
  // }

  // Show Settings Panel on Hover
  showSettingsHover() {
    clearTimeout(this.settingsTimeout);
    this.isSettingsVisible = true;
  }

  // Delay hiding settings panel to prevent accidental disappearance
  hideSettingsHover() {
    this.settingsTimeout = setTimeout(() => {
      this.isSettingsVisible = false;
    }, 200);
  }

  // Show Profile Dropdown on Hover
  showProfile() {
    clearTimeout(this.profileTimeout);
    this.isProfileOpen = true;
  }

  // Delay hiding Profile Dropdown to prevent flickering
  hideProfile() {
    this.profileTimeout = setTimeout(() => {
      this.isProfileOpen = false;
    }, 200);
  }

  // Handle Colorblind Mode Change
  setColorblindMode(mode: string) {
    this.colorService.setColorblindMode(mode);
  }
}
