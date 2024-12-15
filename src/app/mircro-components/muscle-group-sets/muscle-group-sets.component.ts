import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { StatsService } from '../../services/stats.service';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import { Input } from '@angular/core';
Chart.register(...registerables);

interface MuscleGroup {
  id: number;
  name: string;
  sets: number[];
  bestSets?: number;
}

interface MuscleGroupSetsData {
  dates: string[];
  muscle_groups: MuscleGroup[];
}

@Component({
  selector: 'app-muscle-group-sets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './muscle-group-sets.component.html',
  styleUrl: './muscle-group-sets.component.css'
})
export class MuscleGroupSetsComponent implements OnInit, OnDestroy {
  @Input() clientId: number = 0;
  chart: any;
  muscleGroups: MuscleGroup[] = [];
  selectedPeriod: 'week' | 'month' | 'year' = 'week';

  constructor(
    private statsService: StatsService,
    private authService: AuthService,
    private location: Location
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
    const userId = this.clientId || this.authService.getUserId();

    if (userId === null) {
      console.error('No se pudo obtener el ID del usuario.');
      return;
    }

    this.statsService.getMuscleGroupSetsData(userId, this.selectedPeriod).subscribe({
      next: (data: MuscleGroupSetsData) => {
        console.log('Datos recibidos del API:', data);
        
        const formattedDates = data.dates.map((date: string) => this.formatDate(date));
        
        this.muscleGroups = data.muscle_groups.map((group: MuscleGroup) => {
          return {
            ...group,
            bestSets: Math.max(...group.sets)
          };
        });

        const datasets = this.muscleGroups.map(group => ({
          label: group.name,
          data: group.sets,
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

  changePeriod(period: 'week' | 'month' | 'year') {
    this.selectedPeriod = period;
    this.loadMuscleGroupData();
  }

  goBack() {
    this.location.back();
  }

  getRandomColor(): string {
    const colors = [
      '#1680EA', '#EA4C16', '#16EA88', '#EA16D9', 
      '#8816EA', '#EAD916', '#16D9EA', '#EA1616'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  createChart(labels: string[], datasets: any[]) {
    const ctx = document.getElementById('muscleGroupSetsChart') as HTMLCanvasElement;
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
                return `${context.dataset.label}: ${context.parsed.y} series`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Número de Series',
              font: {
                family: 'Arial, sans-serif',
                size: 12
              }
            },
            ticks: {
              stepSize: 1,
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
