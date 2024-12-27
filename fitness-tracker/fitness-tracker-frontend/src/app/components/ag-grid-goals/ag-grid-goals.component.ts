import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ColDef, GridApi, GridReadyEvent, Module } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { CsvExportModule } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { AuthService } from '../../auth.service';
import {formatDate} from '@angular/common';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
]);

@Component({
  selector: 'app-ag-grid-goals',
  standalone: true,
  templateUrl: './ag-grid-goals.component.html',
  styleUrls: ['./ag-grid-goals.component.css'],
  imports: [AgGridAngular],
})
export class AgGridGoalsComponent implements OnInit {
  public rowData: any[] = [];
  public columnDefs: ColDef[] = [
    { field: 'id', headerName: 'Id', sortable: true, filter: true },
    { field: 'name', headerName: 'Name', sortable: true, filter: true },
    { field: 'description', headerName: 'Description', sortable: true, filter: true },
    {
      field: 'targetdate',
      headerName: 'Target Date',
      sortable: true,
      filter: 'agDateColumnFilter',
      valueGetter: (params) => {
        const date = params.data.targetdate;
        return date ? formatDate(date, 'dd-MM-yyyy', 'en-GB') : '';
      },
    },
  ];

  public defaultColDef: ColDef = {
    resizable: true,
    flex: 1,
    filter: true,
    sortable: true,
  };

  public modules: Module[] = [ClientSideRowModelModule, CsvExportModule];
  public gridHeight: number = 200;

  private gridApi!: GridApi;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadData();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.adjustGridHeight();
    this.gridApi.sizeColumnsToFit();
  }

  loadData(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const url = 'http://localhost:5000/api/goals';
      this.http.get<any[]>(url, { headers }).subscribe({
        next: (response) => {
          this.rowData = response;
          this.adjustGridHeight();
        },
        error: (err) => console.error('Error loading data:', err),
      });
    }
  }

  adjustGridHeight(): void {
    const rowHeight = 48;
    const headerHeight = 56;
    const buffer = 20;
    this.gridHeight = Math.min(this.rowData.length * rowHeight + headerHeight + buffer, 400);
  }

  exportToCSV(): void {
    if (this.gridApi) {
      this.gridApi.exportDataAsCsv();
    }
  }
}
