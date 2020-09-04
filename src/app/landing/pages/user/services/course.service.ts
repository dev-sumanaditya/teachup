import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Course } from "src/app/landing/store/models/course.model";
import { ReplaySubject } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  dataSubject = new ReplaySubject<any>(1);
  dataObs = this.dataSubject.asObservable();

  addedToCartSubject = new ReplaySubject<any>(1);
  addedToCartObs = this.addedToCartSubject.asObservable();

  constructor(private http: HttpClient) {}

  getDefaultData(id) {
    return this.http.get<any>(environment.apiUrl + "/course/" + id).pipe(
      tap((data) => {
        this.passData(data.data);
      })
    );
  }

  setAddedToCart(data) {
    this.addedToCartSubject.next(data);
  }

  passData(data) {
    this.dataSubject.next(data);
  }

  getEnrolledCourses() {
    return this.http.get<any>(environment.apiUrl + "/course/user");
  }

  chechEnrolled(id) {
    return this.http.get<any>(
      environment.apiUrl + "/course/" + id + "/enrolled"
    );
  }
}
