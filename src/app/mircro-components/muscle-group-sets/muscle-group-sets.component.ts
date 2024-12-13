import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { StatsService } from '../../services/stats.service';

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
  chart: any;
  muscleGroups: MuscleGroup[] = [];

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.loadMuscleGroupData();
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

  loadMuscleGroupData() {
    this.statsService.getMuscleGroupSetsData().subscribe({
      next: (data: MuscleGroupSetsData) => {
        console.log('Datos recibidos del API:', data);
        const reversedDates = [...data.dates].reverse();
        const formattedDates = reversedDates.map((date: string) => this.formatDate(date));
        
        this.muscleGroups = data.muscle_groups.map((group: MuscleGroup) => ({
          ...group,
          sets: [...group.sets].reverse(),
          bestSets: Math.max(...group.sets)
        }));

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