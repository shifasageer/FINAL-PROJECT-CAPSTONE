import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { WellbeingService } from '../wellbeing.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-screen-time',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, RouterModule, NgApexchartsModule],
  templateUrl: './screen-time.component.html',
  styleUrls: ['./screen-time.component.css'],
})
export class ScreenTimeComponent implements OnInit {
  averageUsageChartOptions: ChartOptions = {
    series: [],
    chart: {
      type: 'donut',
      height: 350,
    },
    labels: [],
    title: {
      text: 'Average App Usage Over 5 Days',
    },
  };

  singleDayUsageChartOptions: ChartOptions = {
    series: [],
    chart: {
      type: 'donut',
      height: 350,
    },
    labels: [],
    title: {
      text: 'App Usage on Selected Date',
    },
  };

  screenTime = {
    date: '',
    appUsage: {} as { [key: string]: number },
  };
  totalTime: number | null = null;

  constructor(private screenTimeService: WellbeingService) {}

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData() {
    const userId = localStorage.getItem('userId'); // Get userId from local storage
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    this.screenTimeService.getScreenTimeData(userId).subscribe(
      (data: {
        averageUsage: { [s: string]: number };
        singleDayUsage: { [s: string]: number };
      }) => {
        this.averageUsageChartOptions.series = Object.values(
          data.averageUsage
        ) as ApexNonAxisChartSeries;
        this.averageUsageChartOptions.labels = Object.keys(data.averageUsage);

        this.singleDayUsageChartOptions.series = Object.values(
          data.singleDayUsage
        ) as ApexNonAxisChartSeries;
        this.singleDayUsageChartOptions.labels = Object.keys(
          data.singleDayUsage
        );
      },
      (error) => {
        console.error('Error fetching screen time data:', error);
      }
    );
  }

  onSubmit() {
    const userId = localStorage.getItem('userId'); // Assumes userId is stored in local storage
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    this.screenTimeService.addScreenTime(this.screenTime, userId).subscribe(
      (response) => {
        console.log('Screen time added:', response);
        this.resetForm();
      },
      (error) => {
        console.error('Error adding screen time:', error);
      }
    );
  }

  onViewScreenTime() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    this.screenTimeService
      .getTotalScreenTimeForDate(this.screenTime.date, userId)
      .subscribe({
        next: (response) => {
          this.totalTime = response;
          console.log('Total screen time:', this.totalTime);
        },
        error: (error) => {
          console.error('Error fetching total screen time:', error);
        },
      });
  }

  addAppUsage(appName: string, hoursUsed: number) {
    this.screenTime.appUsage[appName] = hoursUsed;
  }

  resetForm() {
    this.screenTime = {
      date: '',
      appUsage: {},
    };
    this.totalTime = null;
  }
}
