import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { StatsService } from '../../services/stats.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
Chart.register(...registerables);

interface WeightData {
  date: string;
  weight: number;
}

interface MonthlyWeightData {
  months: string[];
  average_weights: number[];
}

@Component({
  selector: 'app-user-weight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-weight.component.html',
  styleUrl: './user-weight.component.css'
})
export class UserWeightComponent implements OnInit, OnDestroy {
  chart: any;
  selectedPeriod: 'week' | 'month' | 'year' = 'week';

  constructor(
    private statsService: StatsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadWeightData();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  formatDate(dateString: string): string {
    if (this.selectedPeriod === 'year') {
      const [year, month] = dateString.split('-').map(Number);
      return new Date(year, month - 1).toLocaleString('es', { month: 'short' });
    } else {
      const [year, month, day] = dateString.split('-').map(Number);
      return `${day} ${new Date(year, month - 1).toLocaleString('es', { month: 'short' })}`;
    }
  }

  loadWeightData() {
    const userId = this.authService.getUserId();

    if (userId === null) {
      console.error('No se pudo obtener el ID del usuario logueado.');
      return;
    }

    this.statsService.getUserWeights(userId, this.selectedPeriod).subscribe({
      next: (data: WeightData[] | MonthlyWeightData) => {
        let labels: string[];
        let weights: number[];

        if (this.selectedPeriod === 'year') {
          const monthlyData = data as MonthlyWeightData;
          labels = monthlyData.months.map(month => this.formatDate(month));
          weights = monthlyData.average_weights;
        } else {
          const dailyData = data as WeightData[];
          labels = dailyData.map(entry => this.formatDate(entry.date));
          weights = dailyData.map(entry => entry.weight);
        }

        this.createChart(labels, weights);
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
      }
    });
  }

  changePeriod(period: 'week' | 'month' | 'year') {
    this.selectedPeriod = period;
    this.loadWeightData();
  }

  goBack() {
    this.router.navigate(['/client-stats']);
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
