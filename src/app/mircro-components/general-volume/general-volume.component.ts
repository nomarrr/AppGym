import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { StatsService } from '../../services/stats.service';
import { StatsStateService } from '../../services/stats-state.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
Chart.register(...registerables);

@Component({
  selector: 'app-general-volume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-volume.component.html',
  styleUrl: './general-volume.component.css'
})
export class GeneralVolumeComponent implements OnInit, OnDestroy {
  chart: any;
  bestVolume: number = 0;
  selectedPeriod: 'week' | 'month' | 'year' = 'week';

  constructor(
    private statsService: StatsService,
    private statsStateService: StatsStateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadVolumeData();
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
      const date = new Date(dateString);
      const day = date.getUTCDate();
      const month = date.toLocaleString('es', { month: 'short' });
      return `${day} ${month}`;
    }
  }

  loadVolumeData() {
    const userId = this.authService.getUserId();
    
    if (userId === null) {
      console.error('No se pudo obtener el ID del usuario logueado.');
      return;
    }

    this.statsService.getVolumeData(userId, this.selectedPeriod).subscribe({
      next: (data) => {
        console.log('Datos recibidos del API:', data);

        const reversedData = [...data].reverse();
        
        this.bestVolume = Math.max(...reversedData.map(w => w.total_volume));
        
        const chartData = {
          labels: reversedData.map(w => this.formatDate(w.date)),
          values: reversedData.map(w => w.total_volume)
        };

        this.createChart(chartData);
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
      }
    });
  }

  changePeriod(period: 'week' | 'month' | 'year') {
    this.selectedPeriod = period;
    this.loadVolumeData();
  }

  createChart(data: { labels: string[], values: number[] }) {
    const ctx = document.getElementById('volumeChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Volumen Total',
          data: data.values,
          borderColor: '#1680EA',
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#1680EA',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Volumen: ${context.parsed.y} kg`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Volumen Total (kg)',
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

  goBack() {
    this.router.navigate(['/client-stats']);
  }
}
