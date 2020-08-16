import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Course } from "src/app/landing/store/models/course.model";
import { ReplaySubject } from "rxjs";
import { shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  dataSubject = new ReplaySubject<any>(1);
  dataObs = this.dataSubject.asObservable().pipe(shareReplay(1));

  constructor(private http: HttpClient) {}

  getDefaultData() {
    return this.http.get<Course>("http://localhost:3000/course");
  }

  passData(data) {
    this.dataSubject.next(data);
  }
}
