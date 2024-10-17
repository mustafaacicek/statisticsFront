import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TableData, TableserviceService} from "./tableservice.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {



  displayedColumns: string[] = ['iladi', 'sum2018', 'sum2019', 'sum2020', 'sum2021', 'sum2022', 'sum2023', 'sum2024', 'toplamSayi', 'nufus', 'satisNufusOraniYuzde'];


  dataSource = new MatTableDataSource<TableData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tableService: TableserviceService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.tableService.getMotorData().subscribe((data: TableData[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
