import { Component, OnInit } from '@angular/core';
import { ScreenTimeChartComponent } from "../screen-time-chart/screen-time-chart.component";
import { SleepChartComponent } from "../sleep-chart/sleep-chart.component";
import { DayPlannerComponent } from '../day-planner/day-planner.component';
import { WellbeingService } from '../wellbeing.service';
import { NgIf } from '@angular/common';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-wellbeing-page',
  standalone: true,
  imports: [ScreenTimeChartComponent, SleepChartComponent, DayPlannerComponent, NgIf, NgApexchartsModule],
  templateUrl: './wellbeing-page.component.html',
  styleUrl: './wellbeing-page.component.css'
})
export class WellbeingPageComponent implements OnInit {
  result: any = null;
  resultLastUpdated : string = "";
  score: string | null = '';
  

  specificDate: string = ''; // Set this date based on user input or current date
  totalCaloriesForDate: number = 0;

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

  constructor(private wellbeingService: WellbeingService) {}

  ngOnInit(): void {
    // Retrieve result from local storage
    const storedResult = localStorage.getItem('wellbeingResult');
    this.resultLastUpdated = localStorage.getItem("LastUpdated") ?? "";
    if (storedResult) {
      this.result = JSON.parse(storedResult);
    }
    

    this.score = localStorage.getItem('workLifeBalanceScore');
    this.loadChartData();

    this.loadTotalCalories();

    
  }

  

  loadTotalCalories(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }
    
    this.wellbeingService.getDietByDate('2024-09-03', userId).subscribe(
      (diets: any[]) => {
        this.totalCaloriesForDate = diets.reduce(
          (sum, diet) => sum + diet.totalCalories,
          0
        );
        console.log('Total calories for date:', this.totalCaloriesForDate);
      },
      (error) => {
        console.error('Error fetching total calories:', error);
      }
    );
  }



  loadChartData(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    this.wellbeingService.getScreenTimeData(userId).subscribe(
      (data: {
        averageUsage: { [s: string]: number };
      }) => {
        this.averageUsageChartOptions.series = Object.values(
          data.averageUsage
        ) as ApexNonAxisChartSeries;
        this.averageUsageChartOptions.labels = Object.keys(data.averageUsage);
      },
      (error) => {
        console.error('Error fetching screen time data:', error);
      }
    );
  }
}
