import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EnfantService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getEnfants(): Observable<any> {
    return this.http.get('/api/enfants').map(res => res.json());
  }

  getEnfantsCreated(): Observable<any> {
    return this.http.get('/api/enfants/created').map(res => res.json());
  }

  countEnfants(): Observable<any> {
    return this.http.get('/api/enfants/count').map(res => res.json());
  }

  addEnfant(enfant): Observable<any> {
    return this.http.post('/api/enfant', JSON.stringify(enfant), this.options);
  }

  getEnfant(enfant): Observable<any> {
    return this.http.get(`/api/enfant/${enfant._id}`).map(res => res.json());
  }

  editEnfant(enfant): Observable<any> {
    return this.http.put(`/api/enfant/${enfant._id}`, JSON.stringify(enfant), this.options);
  }

  deleteEnfant(enfant): Observable<any> {
    return this.http.delete(`/api/enfant/${enfant._id}`, this.options);
  }

}
