import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { VacancyService } from './services/vacancy.service';
import { AnalysisService } from './services/analysis.service';

import { SalaryPipe } from './pipes/salary.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SalaryPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    VacancyService,
    AnalysisService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
