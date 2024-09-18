import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-accident',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './report-accident.component.html',
  styleUrl: './report-accident.component.css',
})
export class ReportAccidentComponent {
  quote: string | undefined;
  author: string | undefined;

  showCrisisSupport: boolean = true; // For toggling crisis support info
  private quoteInterval: any; // To hold the interval reference

  constructor(private http: HttpClient) {}

  

  toggleCrisisSupport(): void {
    this.showCrisisSupport = !this.showCrisisSupport;
  }
}
