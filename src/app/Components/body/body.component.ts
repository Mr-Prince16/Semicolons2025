import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ChatbotComponent } from "../chatbot/chatbot.component";
import { FooterComponent } from "../footer/footer.component";
import { ColorService } from '../../Services/color.service';
import { CommonModule, NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-body',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent,RouterOutlet, CommonModule, NgClass, ChatbotComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit {
  currentColorblindMode: string = '';
  currentTextColor = 'text-white-300'; 

  constructor(private colorService: ColorService) {
    this.currentColorblindMode = 'Normal-Condition';

  }
  ngOnInit(): void {
   
    this.colorService.colorblindMode$.subscribe(mode => {
      this.currentColorblindMode = mode;
      this.setTextColor(mode);
    });
  
    this.colorService.textColor$.subscribe(color => {
      this.currentTextColor = color;
    });
  }
  setTextColor(mode: string) {
    const textColors: { [key: string]: string } = {
      'Normal-Condition': 'text-gray-900',
      'Protanopia': 'text-green-500',
      'Deuteranopia': 'text-orange-700',
      'Tritanopia': 'text-purple-900',
      'Achromatopsia': 'text-gray-600'
    };
    this.currentTextColor = textColors[mode] || 'text-white';
  }
}
