import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/landing/store/models/course.model';
import { CourseService } from '../../user/services/course.service';

@Component({
  selector: 'app-courseinfo',
  templateUrl: './courseinfo.component.html',
  styleUrls: ['./courseinfo.component.scss']
})
export class CourseinfoComponent implements OnInit {

  public menu = [
    {
      name: 'Overview',
      url: './'
    },
    {
      name: 'About',
      url: 'about'
    },
    {
      name: 'Resources',
      url: 'resources'
    },
    {
      name: 'Discussions',
      url: 'discussions'
    },
    {
      name: 'Reviews',
      url: 'reviews'
    }
  ];

  public courseData: Course;

  constructor(private cService: CourseService) {}

  ngOnInit(): void {
    this.cService.getDefaultData().subscribe(
      data => {
        this.courseData = data[0];
        this.cService.setDefaultData(data[0]);
      }
    );
  }

}
