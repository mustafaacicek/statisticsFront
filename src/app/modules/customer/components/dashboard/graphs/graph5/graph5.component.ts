import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js";
import {Graph5ServiceService} from "./graph5-service.service";
import {drawDataLabels, functions} from "../../../../../../environment/functions";

@Component({
  selector: 'app-graph5',
  templateUrl: './graph5.component.html',
  styleUrl: './graph5.component.scss'
})




export class Graph5Component implements OnInit {
  chart: any;

  constructor(private graph5Service: Graph5ServiceService) {}

  ngOnInit(): void {
    this.graph5Service.getChart5().subscribe(
      data => this.createChart(data),
      error => console.error('Error fetching sales data:', error)
    );
  }

  createChart(apiData: any[]): void {
    const labels = apiData.map(sale => sale.year);
    const data = apiData.map(sale => sale.totalSales);

    const { month, year } = functions.getLastMonthAndYear();

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('salesChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Toplam Satışlar',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.8)', // Bar rengi
            borderColor: 'rgba(75, 192, 192, 0.8)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `SEKTÖR BAZINDA OCAK - ${month} ${year - 2} - ${year - 1} - ${year} TOPLAM TUİK VERİLERİ`,
            font: {
              size: 20,
              weight: 'bold',
              family: 'Arial',
            },
          },
          legend: {
            display: false, // Efsane alanını tamamen gizle
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Toplam Satış Miktarı',
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
              text: 'Yıl',
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
        },
      },
    });
  }


}
