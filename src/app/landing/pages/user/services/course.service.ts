import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from 'src/app/landing/store/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  public defaultData;

  constructor(private http: HttpClient) { }

  getDefaultData() {
    return this.http.get<Course>('http://localhost:3000/course');
  }
  setDefaultData(data) {
    this.defaultData = data;
  }
  returnDefaultData() {
    return this.defaultData;
  }

}
