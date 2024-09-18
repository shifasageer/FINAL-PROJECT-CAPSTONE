import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  BarController,
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController
);

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('sleepChart', { static: false })
  sleepChartRef!: ElementRef<HTMLCanvasElement>;

  sleepData: any;
  chart: Chart | null = null;
  chartInitialized = false;

  ngOnInit(): void {
    this.loadSleepData();
  }

  loadSleepData(): void {
    // Placeholder for fetching sleep data
    this.sleepData = [
      { date: '2024-09-01', duration: 7 },
      { date: '2024-09-02', duration: 6.5 },
      { date: '2024-09-03', duration: 8 },
      { date: '2024-09-04', duration: 8 },
      { date: '2024-09-05', duration: 8 },
      { date: '2024-09-06', duration: 5.5 },
      { date: '2024-09-07', duration: 7.2 },
    ];

    this.createChart(this.sleepData);
  }

  ngAfterViewInit(): void {
    if (this.sleepData && !this.chartInitialized && this.sleepChartRef) {
      this.createChart(this.sleepData);
      this.chartInitialized = true;
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  createChart(sleepData: { date: string; duration: number }[]): void {
    const canvas = this.sleepChartRef?.nativeElement;
    const ctx = canvas?.getContext('2d');

    if (!ctx || sleepData.length === 0) {
      console.error(
        'Chart context initialization failed or no data available.'
      );
      return;
    }

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sleepData.map((data) => data.date),
        datasets: [
          {
            label: 'Sleep Duration (hours)',
            data: sleepData.map((data) => data.duration),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: 'Hours Slept',
            },
            grid: {
              color: '#f2f2f2',
            },
          },
        },
      },
    });
  }
}
