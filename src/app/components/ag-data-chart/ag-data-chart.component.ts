import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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

  public chartOptions: any = {};

  private destroy$ = new Subject<void>();

  constructor(
    private chartDataService: DashboardChartDataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chartDataService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ChartData) => {
        this.updateChart(data);
        this.cd.markForCheck();
      });
  }

  private updateChart(data: ChartData): void {
    const allData: any[] = [];
    const series: any[] = [];

    data.series.forEach((s: ChartSeriesData) => {
      const transformed = this.transformData(s.data);
      allData.push(...transformed);

      const seriesConfig: any = {
        type: s.type === 'line' ? 'line' : 'scatter',
        xKey: 'x',
        yKey: 'y',
        data: transformed,
      };

      if (s.type === 'line') {
        seriesConfig.stroke = s.lineStyle?.color || '#000';
        seriesConfig.lineDash = s.lineStyle?.type === 'dashed' ? [5, 5] : undefined;
      } else {
        seriesConfig.fill = s.itemStyle?.color || '#000';
        seriesConfig.marker = {
          shape: s.symbol === 'triangle' ? 'triangle' : 'circle',
          size: s.symbolSize || 6,
        };
      }

      series.push(seriesConfig);
    });

    this.chartOptions = {
      data: allData,
      series,
      axes: [
        { type: 'number', position: 'bottom', label: { rotation: 0 } },
        { type: 'number', position: 'left' },
      ],
    };
  }

  private transformData(data: number[] | [number, number][]): { x: number; y: number }[] {
    if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
      return (data as [number, number][]).map(([x, y]) => ({ x, y }));
    }
    return (data as number[]).map((y, i) => ({ x: i + 1, y }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
