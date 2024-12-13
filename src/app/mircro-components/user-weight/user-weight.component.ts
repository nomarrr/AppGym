import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { StatsService } from '../../services/stats.service';

Chart.register(...registerables);

@Component({
  selector: 'app-user-weight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-weight.component.html',
  styleUrl: './user-weight.component.css'
})
export class UserWeightComponent implements OnInit, OnDestroy {
  chart: any;

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.loadWeightData();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('es', { month: 'short' });
    return `${day} ${month}`;
  }

  loadWeightData() {
    this.statsService.getUserWeights().subscribe({
      next: (data) => {
        console.log('Datos recibidos del API:', data);
        const reversedDates = [...data.dates].reverse();
        const reversedWeights = [...data.weights].reverse();
        const formattedDates = reversedDates.map((date: string) => this.formatDate(date));
        this.createChart(formattedDates, reversedWeights);
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
      }
    });
  }

  createChart(labels: string[], data: number[]) {
    const ctx = document.getElementById('userWeightChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Peso',
          data: data,
          borderColor: '#1680EA',
          tension: 0.4,
          pointRadius: 4,
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                family: 'Arial, sans-serif',
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.parsed.y} kg`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Peso (kg)',
              font: {
                family: 'Arial, sans-serif',
                size: 12
              }
            },
            ticks: {
              callback: function(value) {
                return value + ' kg';
              },
              font: {
                family: 'Arial, sans-serif',
                size: 12
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            title: {
              display: true,
              text: 'Fecha',
              font: {
                family: 'Arial, sans-serif',
                size: 12
              }
            },
            ticks: {
              font: {
                family: 'Arial, sans-serif',
                size: 12
              }
            }
          }
        }
      }
    });
  }
}
