import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/landing/pages/user/services/course.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  public data;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.dataObs.subscribe((data) => {
      this.data = data;
    });
  }
}
