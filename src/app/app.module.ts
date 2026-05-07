import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EchartsDataChartComponent } from './components/echarts-data-chart/echarts-data-chart.component';
import { AgDataChartComponent } from './components/ag-data-chart/ag-data-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    EchartsDataChartComponent,
    AgDataChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
