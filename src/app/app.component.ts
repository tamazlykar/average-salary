import { Component } from '@angular/core';
import { VacancyService } from './services/vacancy.service';
import { AnalysisService } from './services/analysis.service';
import { Vacancy } from './model/vacancy';
import { Range } from './model/range';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public vacancies: Vacancy[];
  public showAnalytics = false;
  public showNoProfesssionMessage = false;
  public count: number;
  public minSalary: number;
  public maxSalary: number;
  public averageSalary: Range;
  public medianSalary: Range;

  constructor(private vacancyService: VacancyService, private analysisService: AnalysisService) {}

  public search(text: string) {
    text = text.trim();
    if (!text) { return; }

    this.vacancyService.getVacancies(text)
      .subscribe(data =>  {
        if (!data || data.length === 0) {
          this.showAnalytics = false;
          this.showNoProfesssionMessage = true;
          return;
        }

        this.vacancies = data;
        this.setAnalytics(data);
      });
  }

  public setAnalytics(vacancies: Vacancy[]) {
    this.count = this.analysisService.getVacanciesCount(vacancies);
    this.minSalary = this.analysisService.getMinSalary(vacancies);
    this.maxSalary = this.analysisService.getMaxSalary(vacancies);
    this.averageSalary = this.analysisService.getAverage(vacancies);
    this.medianSalary = this.analysisService.getMedian(vacancies);

    this.showNoProfesssionMessage = false;
    this.showAnalytics = true;
  }
}
