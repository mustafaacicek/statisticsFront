import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from "chart.js";
import { Router } from "@angular/router";
import { DashboardServiceService } from "./dashboardService.service";
import {drawDataLabels, functions} from "../../../../environment/functions";

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  chart: any;
  id: string = '';

  salesData1: { yılı: number; toplamSatis: number }[] = [];

  constructor(private router: Router, private motorService: DashboardServiceService) {}

  ngOnInit(): void {
    this.fetchAllSalesMotorData();
  }

  fetchAllSalesMotorData(): void {
    this.motorService.getYearlySales().subscribe(
      data => {
        console.log('Fetched sales data:', data);

        this.salesData1 = data.map(item => ({
          yılı: item.yılı,
          toplamSatis: item.toplamSatis
        }));

        this.createChart();
      },
      error => {
        console.error('Error fetching motor sales data:', error);
        console.log('Response status:', error.status);
        console.log('Response body:', error.error);
      }
    );
  }

  createChart(): void {
    const labels = this.salesData1.map(sale => sale.yılı);
    const data = this.salesData1.map(sale => sale.toplamSatis);
    const { month, year } = functions.getLastMonthAndYear();

    if (this.chart) {
      this.chart.destroy(); // Mevcut grafiği yok et
    }

    this.chart = new Chart('motorSalesChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          // label: 'Toplam Satışlar', // Bu satırı kaldırın
          data: data,
          backgroundColor: 'rgba(64,149,230,0.86)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `SEKTÖR BAZINDA 2018 - ${year} TOPLAM TUİK VERİLERİ`,
            font: {
              size: 20,
              weight: 'bold',
              family: 'Arial', // Font ailesini Arial olarak ayarlayın
            },
          },
          legend: {
            display: false, // Efsane alanını tamamen gizle
          },
        },
        onClick: (event) => {
          const elements = this.chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
          if (elements.length) {
            const index = elements[0].index;
            const selectedYear = labels[index];
            this.router.navigate(['/monthly-sales', selectedYear]);
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Satış Miktarı',
              font: {
                size: 14,
                weight: 'normal', // Y ekseni başlığı için kalın font
                family: 'Arial', // Font ailesi
              },
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold', // Y ekseni ölçüm değerleri için kalın font
                family: 'Arial', // Font ailesi
              },
            },
          },
          x: {
            title: {
              display: true,
              text: 'Yıl', // X ekseninin başlığı
              font: {
                size: 14,
                weight: 'bold', // X ekseni başlığı için kalın font
                family: 'Arial', // Font ailesi
              },
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold', // X ekseni ölçüm değerleri için kalın font
                family: 'Arial', // Font ailesi
              },
            },
          },
        },
        animation: {
          onProgress: () => {
            drawDataLabels(this.chart);
          },
        }
      }
    });
  }
}
