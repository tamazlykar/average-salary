import { Injectable } from '@angular/core';
import { Vacancy } from '../model/vacancy';
import { Range } from '../model/range';
import { StatUtils } from '../utils/stat-utils';

@Injectable()
export class AnalysisService {
  constructor() { }

  public getVacanciesCount(vacancies: Vacancy[]): number {
    return vacancies.length;
  }

  public getMinSalary(vacancies: Vacancy[]): number {
    return Math.min.apply(Math, this.getMinSalaries(vacancies));
  }

  public getMaxSalary(vacancies: Vacancy[]): number {
    return Math.max.apply(Math, this.getMaxSalaries(vacancies));
  }

  public getAverage(vacancies: Vacancy[]): Range {
    const minSalaries = this.getMinSalaries(vacancies);
    const maxSalaries = this.getMaxSalaries(vacancies);

    return {
      from: Math.round(StatUtils.findAverage(minSalaries)),
      to: Math.round(StatUtils.findAverage(maxSalaries))
    };
  }

  public getMedian(vacancies: Vacancy[]): Range {
    const minSalaries = this.getMinSalaries(vacancies);
    const maxSalaries = this.getMaxSalaries(vacancies);

    return {
      from: StatUtils.findMedian(minSalaries),
      to: StatUtils.findMedian(maxSalaries)
    };
  }

  private getMinSalaries(vacancies: Vacancy[]) {
    return vacancies
      .map(el => el.salary.from)
      .filter(salary => salary !== null);
  }

  private getMaxSalaries(vacancies: Vacancy[]) {
    return vacancies
      .map(el => el.salary.to)
      .filter(salary => salary !== null);
  }
}
