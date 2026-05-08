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
    const series: any[] = [];

    data.series.forEach((s: ChartSeriesData) => {
      const transformed = this.transformData(s.data);

      const seriesConfig: any = {
        type: s.type === 'line' ? 'line' : 'scatter',
        xKey: 'x',
        yKey: 'y',
        yName: s.name,
        data: transformed,
      };

      if (s.type === 'line') {
        seriesConfig.stroke = s.lineStyle?.color;
        if (s.lineStyle?.type === 'dashed') {
          seriesConfig.lineDash = [6, 4];
        }
        if (s.smooth) {
          seriesConfig.interpolation = { type: 'smooth' };
        }
        if (s.showSymbol === false) {
          seriesConfig.marker = { enabled: false };
        }
      } else {
        seriesConfig.marker = {
          shape: s.symbol || 'circle',
          size: s.symbolSize || 6,
          fill: s.itemStyle?.color,
        };
      }

      series.push(seriesConfig);
    });

    this.chartOptions = {
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
