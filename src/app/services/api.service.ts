import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // General GET method
  getData = (url, data?) => {
    return this.http.get(url, data);
  }

  // General POST method
  post = (url, data?) => {
    return this.http.post(url, data);
  }

  deleteData = (url, data?) => {
    return this.http.delete(url, data);
  }
}
