import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {
  recognition: any = null;
  transcript$: BehaviorSubject<string> = new BehaviorSubject<string>("");  // Use BehaviorSubject with initial empty string

  constructor(private ngZone: NgZone) {}

  startListening() {
    if (!this.recognition) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error("Speech recognition not supported in this browser.");
        return;
      }

      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: { results: string | any[] }) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        
        this.ngZone.run(() => {
          this.transcript$.next(transcript);
        });
      };

      this.recognition.onerror = (event: { error: any }) => {
        console.error("Speech Recognition Error:", event.error);
      };
    }

    this.recognition.start();
  }

  clearTranscript() {
    this.transcript$.next("");  
  }
  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
      this.recognition = null;
    }
  }
}
