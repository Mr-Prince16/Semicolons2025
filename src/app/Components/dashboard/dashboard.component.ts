import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ColorService } from '../../Services/color.service';
import { TranslationService } from '../../Services/translate.service';
import { ChartContainerComponent } from "../chart-container/chart-container.component";
import { TableComponent } from "../table/table.component";
import { TimelineComponent } from "../timeline/timeline.component";
import { ChatbotComponent } from "../chatbot/chatbot.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartContainerComponent, TableComponent, TimelineComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent  {
  isSidebarVisible: boolean = false;
  showChatbot: boolean = false;
  messages: string[] = ["🤖 Hello! How can I assist you?"];
  currentLanguage!: string;
  closedClaims: number = 34;
  rejectedClaims: number = 12;
  newClaims: number = 25;

  isModalOpen: boolean = false;
  modalType: string = '';
  selectedClaims: string[] = [];

  // Define claimsData properly with key-value pairs
  claimsData: { [key: string]: string[] } = {
    closed: ['Claim #1234', 'Claim #5678', 'Claim #91011'],
    rejected: ['Claim #2222', 'Claim #3333'],
    new: ['Claim #4444', 'Claim #5555', 'Claim #6666']
  };

  // Open modal with specific claim type
  openModal(type: 'closed' | 'rejected' | 'new'): void {
    this.modalType = type;
    this.selectedClaims = this.claimsData[type] || [];
    this.isModalOpen = true;
  }

  // Close modal
  closeModal(): void {
    this.isModalOpen = false;
  }
    constructor(
      private colorService: ColorService,
      private translationService: TranslationService
    ) {
      // this.colorService.darkMode$.subscribe((mode) => (this.isDarkMode = mode));
      this.translationService.currentLang$.subscribe((lang) => (this.currentLanguage = lang));
    }
  sendMessage(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.processUserMessage((event.target as HTMLInputElement).value);
    }
  }

  sendMessageOnClick() {
    const inputField = document.getElementById('userInput') as HTMLInputElement;
    this.processUserMessage(inputField.value);
  }

  private processUserMessage(userMessage: string) {
    if (userMessage.trim()) {
      this.messages.push("🧑‍💻 " + userMessage);
      const inputField = document.getElementById('userInput') as HTMLInputElement;
      inputField.value = "";

      // Simulating AI Response
      setTimeout(() => {
        this.messages.push("🤖 Thinking...");
        setTimeout(() => {
          this.messages[this.messages.length - 1] = "🤖 I'm still learning!";
        }, 1000);
      }, 500);
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Show sidebar when mouse is near the left edge (first 50px)
    if (event.clientX < 50) {
      this.isSidebarVisible = true;
    } 
    // Hide sidebar if mouse moves more than 200px away from the left
    else if (event.clientX > 200) {
      this.isSidebarVisible = false;
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave() {
    // Hide sidebar when the mouse leaves the sidebar
    this.isSidebarVisible = false;
  }
}

