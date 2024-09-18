import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-zen-mode',
  standalone: true,
  imports: [FormsModule, NgFor,NgIf],
  templateUrl: './zen-mode.component.html',
  styleUrl: './zen-mode.component.css',
})
export class ZenModeComponent {
  quote: string | undefined;
  author: string | undefined;

  isZenModeActive: boolean = false;
  zenModeTimer: any;
  zenModeDuration: number = 0; // in seconds
  zenModeMessage: string | undefined;

  private quoteInterval: any; // To hold the interval reference

  durationOptions = [
    { label: '10 minutes', value: 600 },
    { label: '30 minutes', value: 1800 },
    { label: '1 hour', value: 3600 },
    { label: '3 hours', value: 10800 },
    { label: '6 hours', value: 21600 },
    { label: '12 hours', value: 43200 },
  ];

  private zenQuotesUrl =
    'https://thingproxy.freeboard.io/fetch/https://zenquotes.io/api/random';
  private zenModeAudio = new Audio(
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  ); // Replace with a soothing audio URL


  selectedDuration: number = this.durationOptions[0].value; // Default to 10 minutes

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getQuote();
    this.quoteInterval = setInterval(() => this.getQuote(), 60000); // Fetch a new quote every 60 seconds
  }

  ngOnDestroy(): void {
    if (this.quoteInterval) {
      clearInterval(this.quoteInterval); // Clear interval on component destroy
    }
    if (this.zenModeTimer) {
      clearTimeout(this.zenModeTimer); // Clear timer on component destroy
    }
  }

  getQuote(): void {
    this.http.get(this.zenQuotesUrl).subscribe((data: any) => {
      this.quote = data[0]?.q;
      this.author = data[0]?.a;
    });
  }

  startZenMode(duration: number): void {
    this.isZenModeActive = true;
    this.zenModeMessage = undefined; // Clear any previous messages
     this.zenModeAudio.play();
    this.zenModeTimer = setTimeout(() => {
      this.stopZenMode();
      this.zenModeMessage = 'Zen Mode Completed!';
    }, duration * 1000); // Convert seconds to milliseconds
  }

  stopZenMode(): void {
    this.isZenModeActive = false;
    this.zenModeAudio.pause();
    this.zenModeAudio.currentTime = 0;
    if (this.zenModeTimer) {
      clearTimeout(this.zenModeTimer);
    }
  }
}
