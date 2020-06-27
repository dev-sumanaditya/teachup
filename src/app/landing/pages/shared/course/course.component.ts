import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  public course = {
    imageUrl: 'assets/images/demo/course.png'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
