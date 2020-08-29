import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
})
export class CourseComponent implements OnInit {
  @Input() data;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openCourse() {
    this.router.navigate(["/courses", "course", this.data.id]);
  }
}
