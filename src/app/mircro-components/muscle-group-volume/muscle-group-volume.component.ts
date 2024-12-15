import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { StatsService } from '../../services/stats.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
Chart.register(...registerables);

interface MuscleGroup {
  id: number;
  name: string;
  volumes: number[];
  bestVolume: number;
}

interface MuscleGroupVolumeData {
  dates: string[];
  muscle_groups: MuscleGroup[];
}

@Component({
  selector: 'app-muscle-group-volume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './muscle-group-volume.component.html',
  styleUrl: './muscle-group-volume.component.css'
})
export class MuscleGroupVolumeComponent implements OnInit, OnDestroy {
  chart: any;
  muscleGroups: MuscleGroup[] = [];
  selectedPeriod: 'week' | 'month' | 'year' = 'week';

  constructor(
    private statsService: StatsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMuscleGroupData();
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

  loadMuscleGroupData() {
    const userId = this.authService.getUserId();
    
    if (userId === null) {
      console.error('No se pudo obtener el ID del usuario logueado.');
      return;
    }

    this.statsService.getMuscleGroupVolumeData(userId, this.selectedPeriod).subscribe({
      next: (data: MuscleGroupVolumeData) => {
        console.log('Datos recibidos del API:', data);
        
        const formattedDates = data.dates.map((date: string) => this.formatDate(date));
        
        this.muscleGroups = data.muscle_groups.map((group: MuscleGroup) => {
          return {
            ...group,
            bestVolume: Math.max(...group.volumes)
          };
        });

        const datasets = this.muscleGroups.map(group => ({
          label: group.name,
          data: group.volumes,
          borderColor: this.getRandomColor(),
          tension: 0.4,
          pointRadius: 4,
          borderWidth: 2,
          fill: false
        }));

        this.createChart(formattedDates, datasets);
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
      }
    });
  }

  getRandomColor(): string {
    const colors = [
      '#1680EA', '#EA4C16', '#16EA88', '#EA16D9', 
      '#8816EA', '#EAD916', '#16D9EA', '#EA1616'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  createChart(labels: string[], datasets: any[]) {
    const ctx = document.getElementById('muscleGroupChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
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
                return `${context.dataset.label}: ${context.parsed.y} kg`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Volumen (kg)',
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

  changePeriod(period: 'week' | 'month' | 'year') {
    this.selectedPeriod = period;
    this.loadMuscleGroupData();
  }

  goBack() {
    this.router.navigate(['/client-stats']);
  }
}
