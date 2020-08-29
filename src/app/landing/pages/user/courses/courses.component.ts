import { Component, OnInit } from "@angular/core";
import { CourseService } from "../services/course.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  items = [];

  constructor(private courseService: CourseService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>(environment.apiUrl + "/course/user")
      .subscribe(({ data }) => {
        this.items = data;
      });
  }
}
