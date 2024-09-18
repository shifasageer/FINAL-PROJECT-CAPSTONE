import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartConfiguration,
} from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend, Title);

@Component({
  selector: 'app-screen-time-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screen-time-chart.component.html',
  styleUrls: ['./screen-time-chart.component.css'],
})
export class ScreenTimeChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pieChart', { static: false })
  pieChartRef!: ElementRef<HTMLCanvasElement>;

  chart: Chart | null = null;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  createChart(): void {
    const canvas = this.pieChartRef?.nativeElement;
    const ctx = canvas?.getContext('2d');

    if (!ctx) {
      console.error('Chart context initialization failed.');
      return;
    }

    const appUsageData = [40, 25, 20, 10, 5]; // Example usage in percentages
    const appLabels = [
      'Social Media',
      'Productivity',
      'Entertainment',
      'Games',
      'Others',
    ];
    const appColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: appLabels,
        datasets: [
          {
            data: appUsageData,
            backgroundColor: appColors,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Screen Time Distribution',
          },
        },
      },
    };

    // Type assertion to explicitly define the type of Chart
    this.chart = new Chart(ctx as CanvasRenderingContext2D, config as any);
  }
}
