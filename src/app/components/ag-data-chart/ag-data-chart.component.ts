import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartSeriesData, DashboardChartDataService } from 'src/app/services/dashboard-chard-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ag-data-chart',
  templateUrl: './ag-data-chart.component.html',
  styleUrls: ['./ag-data-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgDataChartComponent implements OnInit, OnDestroy {

  @ViewChild('main', { static: true }) chartEl!: ElementRef;

  private chartInstance: object | null = null;

  private destroy$ = new Subject<void>();

  constructor(private chartDataService: DashboardChartDataService) {}

  ngOnInit(): void {
    //this.chartInstance = this.chartDataService.createChart(this.chartEl.nativeElement);

    this.chartDataService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ChartData) => this.updateChart(data));
  }

  private updateChart(data: ChartData): void {
    console.log('update chart');
    console.log(data);

    if (!this.chartInstance) return;

    //this.chartDataService.updateChart(this.chartInstance, data);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.chartInstance) {
      //this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }
}
