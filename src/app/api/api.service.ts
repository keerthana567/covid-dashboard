import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseUrl = 'https://api.covid19api.com';

  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get(this.baseUrl+'/world/total');
  }

  fetchDataByCountry(country: string) {
    return this.http.get(this.baseUrl + '/total/country/' + country);
  }

  fetchCountries() {
    return this.http.get(this.baseUrl + '/countries');
  }
}