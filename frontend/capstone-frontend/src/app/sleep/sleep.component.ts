import { Component } from '@angular/core';
import { WellbeingService } from '../wellbeing.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsComponent } from "../charts/charts.component";
import { SleepChartComponent } from "../sleep-chart/sleep-chart.component";

@Component({
  selector: 'app-sleep',
  standalone: true,
  imports: [NgIf, FormsModule, ChartsComponent, SleepChartComponent],
  templateUrl: './sleep.component.html',
  styleUrl: './sleep.component.css'
})
export class SleepComponent {
  
  sleepRecord: any = {
    date: '',
    dayOfWeek: '',
    bedtime: '',
    wakeupTime: '',
    duration: 0,
    additionalNotes: '',
  };

  averageDuration: any;
  estimatedSleepTime: any;
  estimatedWakeUpTime: any;

  constructor(private sleepRecordService: WellbeingService) {}

  onSubmit() {
    const userId = this.getCurrentUserId();
    this.sleepRecord.userId = userId;
   
        this.sleepRecordService.addSleepRecord(this.sleepRecord, userId).subscribe({
            next: (response) => {
                console.log('Sleep record added:', response);
                // Optionally, reset the form or navigate to another view
            },
            error: (error) => {
                console.error('Error creating sleep record:', error);
            }
        });
   
}

onGetAverageDuration(period: string) {
  this.sleepRecordService.getAverageDuration(period).subscribe({
    next: (response) => {
      this.averageDuration = parseFloat(response.averageDuration.toFixed(2));;
      console.log(this.averageDuration);
      // Optionally, reset the form or navigate to another view
    },
    error: (error) => {
      console.error('Error retrieving average duration:', error);
    }
  });
}

onGetEstimatedSleepTime() {
  this.sleepRecordService.getEstimatedSleepTime().subscribe({
    next: (response) => {
      this.estimatedSleepTime = response.estimatedSleepTime; // Extract the specific time
      console.log('Estimated Sleep Time:', this.estimatedSleepTime);
    },
    error: (error) => {
      console.error('Error retrieving estimated sleep time:', error);
    }
  });
}

onGetEstimatedWakeUpTime() {
  this.sleepRecordService.getEstimatedWakeUpTime().subscribe({
    next: (response) => {
      this.estimatedWakeUpTime = response.estimatedWakeUpTime; // Extract the specific time
      console.log('Estimated Wake-Up Time:', this.estimatedWakeUpTime);
    },
    error: (error) => {
      console.error('Error retrieving estimated wake-up time:', error);
    }
  });
}


  getCurrentUserId(): number {
    return parseInt(localStorage.getItem('userId')!, 10); // Retrieve userId from sessionStorage
  }

}
