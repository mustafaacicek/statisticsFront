import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Chart } from "chart.js";
import { MonthlySalesServiceService } from "./monthly-sales-service.service";
import {drawDataLabels} from "../../../../../environment/functions";

@Component({
  selector: 'app-monthly-sales',
  templateUrl: './monthly-sales.component.html',
  styleUrls: ['./monthly-sales.component.scss']
})
export class MonthlySalesComponent implements OnInit {
  selectedYear: number | null = null;
  monthlySalesData: any[] = [];
  private chart: Chart | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private motorService: MonthlySalesServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedYear = +params.get('year')!;
      this.fetchMonthlySalesData();
    });
  }

  fetchMonthlySalesData(): void {
    if (this.selectedYear) {
      this.motorService.getMonthlySales(this.selectedYear).subscribe(
        data => {
          this.monthlySalesData = data;
          this.createChart();
        },
        error => {
          console.error('Error fetching monthly sales data:', error);
        }
      );
    }
  }

  createChart(): void {
    const labels = this.monthlySalesData.map(sale => this.getMonthName(sale.ayı));
    const data = this.monthlySalesData.map(sale => sale.toplamSatis);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('monthlySalesChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `Aylık Satışlar - ${this.selectedYear}`,
          data: data,
          backgroundColor: 'rgba(250,172,124,0.5)',
          borderColor: 'rgb(139,181,165)',
          borderWidth: 1
        }]
      },
      options: {
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
              text: 'Ay', // X ekseninin başlığı
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
        onClick: (event, elements) => {
          if (elements.length) {
            const index = elements[0].index;
            const selectedMonth = this.monthlySalesData[index].ayı;

            this.router.navigate(['/brands', this.selectedYear, selectedMonth]);
          }
        },
        plugins: {
          title: {
            display: true,
            text: `Aylık Satış Verileri - ${this.selectedYear}`,
            font: {
              size: 20,
              weight: 'bold',
              family: 'Arial', // Font ailesi
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          legend: {
            display: false
          }
        },
        animation: {
          onProgress: () => {
            drawDataLabels(this.chart);
          },
          onComplete: () => {
            drawDataLabels(this.chart);
          }
        }
      }
    });
  }

  getMonthName(monthNumber: number): string {
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return months[monthNumber - 1];
  }
}
