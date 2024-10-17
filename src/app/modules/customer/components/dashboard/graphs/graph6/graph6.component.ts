import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DashboardServiceService} from "../../dashboardService.service";
import {Chart} from "chart.js";
import {Graph6ServiceService} from "./graph6-service.service";
import {drawDataLabels, functions} from "../../../../../../environment/functions";

@Component({
  selector: 'app-graph6',
  templateUrl: './graph6.component.html',
  styleUrl: './graph6.component.scss'
})


export class Graph6Component implements OnInit {
  chart: any;
  id: string = '';
  salesData1: { yılı: number, toplamSatis: number }[] = [];

  constructor(private router: Router, private motorService: Graph6ServiceService) {}

  ngOnInit(): void {
    this.fetchAllSalesMotorData();
  }

  fetchAllSalesMotorData(): void {
    this.motorService.getGraph6().subscribe(
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
          backgroundColor: 'rgb(172,159,200)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `SEKTÖR BAZINDA 2013 - ${year} TOPLAM TUİK VERİLERİ`, // Başlıkta ay ve yıl
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
              },
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold', // Y ekseni ölçüm değerleri için kalın font
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
              },
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold', // X ekseni ölçüm değerleri için kalın font
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
