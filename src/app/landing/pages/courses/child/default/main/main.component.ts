import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/landing/pages/user/services/course.service';
import { Store } from '@ngxs/store';
import { AddCartItem } from 'src/app/landing/store/actions/cart.action';
import { CourseMin } from 'src/app/landing/store/models/cart.model';
import { Course } from 'src/app/landing/store/models/course.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public instructor = {
    name: 'Thomas Frank',
    about: 'YouTuber, Author, Entrepreneur',
    img: '/assets/images/demo/avatar2.webp'
  };

  public defaultData: Course;

  constructor(
    private cService: CourseService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.defaultData = this.cService.returnDefaultData();
  }

  addToCart() {
    const dat: CourseMin = {
      id: 'someid',
      name: 'Some title',
      image: '',
      authorName: 'some author name',
      startDate: '12 July 2022',
      price: 7833.00
    };
    this.store.dispatch(new AddCartItem(dat));
  }

}
