import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  public course = {
    imageUrl: 'assets/images/demo/course.png'
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openCourse() {
    this.router.navigate(['/courses', 'course']);
  }
}
