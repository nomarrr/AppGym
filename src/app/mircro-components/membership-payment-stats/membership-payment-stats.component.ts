import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { MembershipStatsService } from '../../services/membership-stats.service';
import { StatsStateService } from '../../services/stats-state.service';

Chart.register(...registerables);

@Component({
  selector: 'app-membership-payment-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './membership-payment-stats.component.html',
  styleUrl: './membership-payment-stats.component.css'
})
export class MembershipPaymentStatsComponent implements OnInit, OnDestroy {
  chart: any;
  selectedPeriod: 'week' | 'month' | 'year' = 'week';
  totalPayments: number = 0;

  constructor(
    private membershipStatsService: MembershipStatsService,
    private statsStateService: StatsStateService
  ) {}

  ngOnInit() {
    this.loadPaymentData();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (this.selectedPeriod === 'year') {
      return date.toLocaleString('es', { month: 'short', year: 'numeric' });
    }
    return date.toLocaleString('es', { day: 'numeric', month: 'short' });
  }

  loadPaymentData() {
    this.membershipStatsService.getPaymentStats(this.selectedPeriod).subscribe({
      next: (data) => {
        const reversedData = [...data].reverse();
        
        this.totalPayments = reversedData.reduce((sum, item) => sum + item.total, 0);
        
        const chartData = {
          labels: reversedData.map(item => {
            const [year, month, day] = item.date.split('-').map(Number);
            
            if (this.selectedPeriod === 'year') {
              return new Date(year, month - 1).toLocaleString('es', { month: 'short' });
            } else {
              return `${day} ${new Date(year, month - 1).toLocaleString('es', { month: 'short' })}`;
            }
          }),
          values: reversedData.map(item => item.total)
        };

        console.log('Datos procesados para la gráfica:', chartData);
        this.createChart(chartData);
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
      }
    });
  }

  changePeriod(period: 'week' | 'month' | 'year') {
    this.selectedPeriod = period;
    this.loadPaymentData();
  }

  createChart(data: { labels: string[], values: number[] }) {
    const ctx = document.getElementById('paymentChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Pagos Presenciales',
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
                return `Total: $${context.parsed.y.toFixed(2)}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Monto ($)',
              font: {
                family: 'Arial, sans-serif',
                size: 12
              }
            },
            ticks: {
              callback: function(value) {
                return '$' + (typeof value === 'number' ? value.toFixed(2) : value);
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  goBack() {
    this.statsStateService.setSelectedStat('');
  }
} 