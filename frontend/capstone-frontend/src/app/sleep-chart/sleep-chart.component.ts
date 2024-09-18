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
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Filler,
  registerables,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Filler
); // Register the Filler plugin

@Component({
  selector: 'app-sleep-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sleep-chart.component.html',
  styleUrls: ['./sleep-chart.component.css'],
})
export class SleepChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('lineChart', { static: false })
  lineChartRef!: ElementRef<HTMLCanvasElement>;

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
    const canvas = this.lineChartRef?.nativeElement;
    const ctx = canvas?.getContext('2d');

    if (!ctx) {
      console.error('Chart context initialization failed.');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          '2024-09-01',
          '2024-09-02',
          '2024-09-03',
          '2024-09-04',
          '2024-09-05',
        ], // Example dates
        datasets: [
          {
            label: 'Estimated Wake-Up Time',
            data: [6, 6.5, 7, 7.5, 8], // Example wake-up times (in hours)
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
          {
            label: 'Bed Time',
            data: [22, 22.5, 23, 23.5, 24], // Example bedtimes (in hours)
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
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
          },
          y: {
            title: {
              display: true,
              text: 'Time (Hours)',
            },
            min: 0,
            max: 24,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }
}
