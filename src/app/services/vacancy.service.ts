import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { Vacancy } from '../model/vacancy';
import { Response } from '../model/response';

import { HttpClient } from '@angular/common/http';
import { API_URL, DEFAULT_PARAMS } from '../api-config';

@Injectable()
export class VacancyService {
  constructor(private http: HttpClient) { }

  public getVacancies(text: string): Observable<Vacancy[]> {
    const vacancies = this.fetchVacancies(text);
    return this.getVacanciesWithRurCurrency(vacancies);
  }

  private fetchVacancies(text: string): Observable<Vacancy[]> {
    const requestUrl = this.getUrl(text);

    return this.http.get<Response>(requestUrl)
      .pipe(
        map((response: Response) => {
          return response.items;
        })
      )
      .catch(this.handleError);
  }

  private getUrl(searchText: string): string {
    const url = new URL(API_URL);

    for (const key in DEFAULT_PARAMS) {
      if (DEFAULT_PARAMS.hasOwnProperty(key)) {
        url.searchParams.append(key, DEFAULT_PARAMS[key].toString());
      }
    }

    const search = searchText.trim();
    if (search.length > 0) {
      url.searchParams.append('text', search);
    }

    return url.toString();
  }

  private getVacanciesWithRurCurrency(vacancies$: Observable<Vacancy[]>): Observable<Vacancy[]> {
    const currencyFilter = (vacancy: Vacancy) => {
      return vacancy.salary.currency === 'RUR';
    };

    return vacancies$
      .pipe(
        map((vacancies: Vacancy[]) => {
          return vacancies.filter(currencyFilter);
        })
      );
  }

  private handleError(error: any) {
    const errMsg = error.message || 'Error requesting vacancies';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
