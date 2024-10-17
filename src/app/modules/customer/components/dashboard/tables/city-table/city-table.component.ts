import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { CityTableService, SalesData } from "./city-table.service";


@Component({
  selector: 'app-city-table',
  templateUrl: './city-table.component.html',
  styleUrls: ['./city-table.component.scss']
})
export class CityTableComponent implements OnInit {

  dataSource = new MatTableDataSource<SalesData>();
  displayedColumns: string[] = ['il'];
  markalar: string[] = [];

  constructor(private cityTableService: CityTableService) { }

  ngOnInit() {
    this.cityTableService.getCitySalesData().subscribe(data => {
      const formattedData = data.map(sale => {
        const row: any = { il: sale.il, cssClass: sale.cssClass }; // cssClass ekleniyor
        sale.markaSatislar.forEach(marka => {
          row[marka.marka] = marka.toplamSayi;
          if (!this.markalar.includes(marka.marka)) {
            this.markalar.push(marka.marka);
          }
        });
        return row;
      });
      this.dataSource.data = formattedData;
      this.displayedColumns.push(...this.markalar);
    });
  }
}
