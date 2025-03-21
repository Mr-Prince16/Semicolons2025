import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, AfterViewInit, ViewChild, ElementRef, HostListener, ChangeDetectorRef, OnInit } from '@angular/core';
import { VoiceService } from '../../Services/voice.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit {
  messages: string[] = ["🤖 Hello! How can I assist you?"];
  showChatbot: boolean = false;
  lastSpokenText: string = '';
  chatStart: boolean =false;
  private recognitionTimeout: any;
  @ViewChild('chatbox') chatbox!: ElementRef;
  @ViewChild('userInput') userInput!: ElementRef;
  

  constructor(public voiceService: VoiceService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.voiceService.transcript$.subscribe(transcript => {
      debugger;
      if (transcript.includes("hey prince")) {
        this.showChatbot = true;
        this.chatStart = true;
      } else {
        
      }
      if(this.chatStart){
        this.handleUserSpeech(transcript);
      }
      this.cdRef.detectChanges(); 
    });

    this.voiceService.startListening();
  }
  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    if (this.showChatbot) {
      this.scrollToBottom();
    }
  }

  handleUserSpeech(transcript: string) {
    this.lastSpokenText = transcript;

    clearTimeout(this.recognitionTimeout);
    this.recognitionTimeout = setTimeout(() => {
      if (this.lastSpokenText) {
        this.sendUserMessage(this.lastSpokenText);
        this.lastSpokenText = ''; 
      }
    }, 2000);
  }

  sendUserMessage(message: string) {
    if (message.trim()) {
      this.messages.push("🧑‍💻 " + message);
      this.userInput.nativeElement.value = ""; 
  

      // if (this.messages.length > 2) {
      //   this.messages.splice(1, 1); 
      // }
  
      setTimeout(() => {
        this.messages.push("🤖 I'm still learning!");
        this.cdRef.detectChanges();
      }, 500);
    }
  }
  
  scrollToBottom() {
    if (!this.chatbox) return; 
  
    // requestAnimationFrame(() => {
    //   this.chatbox.nativeElement.scrollTop = this.chatbox?.nativeElement?.scrollHeight;
    // });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.chatStart || !this.showChatbot) return; 
  
    const chatbotContainer = document.getElementById('chatbotContainer');
    if (chatbotContainer && !chatbotContainer.contains(event.target as Node)) {
      this.showChatbot = false;
      this.chatStart = false;
      this.voiceService.stopListening();
      this.messages = []; 
      this.cdRef.detectChanges();
    }
  }
  
}
