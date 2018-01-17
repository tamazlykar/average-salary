import { TestBed, inject, async } from '@angular/core/testing';

import { VacancyService } from './vacancy.service';
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Response } from '../model/response';
import { Vacancy } from '../model/vacancy';
import { API_URL, DEFAULT_PARAMS } from '../api-config';

describe('VacancyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [VacancyService]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  describe('getVacancies', () => {
    it('should send expected request',
      async(inject([VacancyService, HttpTestingController], (service: VacancyService, backend: HttpTestingController) => {
        service.getVacancies('JavaScript').subscribe();

        backend.expectOne((req: HttpRequest<any>) => {
          let params = '';
          for (const key in DEFAULT_PARAMS) {
            if (DEFAULT_PARAMS.hasOwnProperty(key)) {
              params += `${key}=${DEFAULT_PARAMS[key]}&`;
            }
          }
          params += `text=JavaScript`;

          return req.url === `${API_URL}?${params}`;
        });
    })));

    it('should return Observable<Vacancy[]>',
      async(inject([VacancyService, HttpTestingController], (service: VacancyService, backend: HttpTestingController) => {
        const mockResponse: Response = {
          found: 3,
          page: 0,
          pages: 1,
          items: [
            {id: '1', name: 'Job1', salary: {from: 10, to: 100, currency: 'RUR'}},
            {id: '2', name: 'Job2', salary: {from: 10, to: 20, currency: 'USD'}}, // Should be ignored becouse of currency
            {id: '3', name: 'Job3', salary: {from: 40, to: 60, currency: 'RUR'}},
          ]
        };

        service.getVacancies('JavaScript').subscribe((vacancies: Vacancy[]) => {
          expect(vacancies.length).toEqual(mockResponse.found - 1); // USD job ignored on client side and don't affect on Response
          expect(vacancies[0].id).toEqual(mockResponse.items[0].id);
          expect(vacancies[1].name).toEqual(mockResponse.items[2].name); // vacancies[1] = items[2] coz items[1] was ignored;
          expect(vacancies[1].salary).toBe(mockResponse.items[2].salary);
        });

        backend.expectOne({method: 'GET'}).flush(mockResponse);
    })));
  });



  // describe('getVacancies', () => {
  //   it('should return an Observable<Vacancy[]>', async(inject([VacancyService], (service: VacancyService) => {
  //     service.getVacancies('angular').take(1).subscribe(vacancies => {
  //       expect(vacancies).toEqual(jasmine.any(Object));
  //     });
  //   })));
  // });
});
