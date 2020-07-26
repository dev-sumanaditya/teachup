import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/landing/store/models/course.model';
import { CourseService } from '../../user/services/course.service';
import { CourseMin } from 'src/app/landing/store/models/cart.model';
import { database } from 'firebase';
import { Store, Select } from '@ngxs/store';
import { AddCartItem } from 'src/app/landing/store/actions/cart.action';
import { CartState } from 'src/app/landing/store/states/cart.state';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/landing/services/order.service';
import { Router } from '@angular/router';

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

  public showPaymentModal = false;
  public courseData: Course;
  public cartData: CourseMin[];
  @Select(CartState.getCartItems) cartItems: Observable<CourseMin[]>;

  constructor(
    private cService: CourseService,
    private store: Store,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cService.getDefaultData().subscribe(
      data => {
        this.courseData = data[0];
        this.cService.setDefaultData(data[0]);
      }
    );
    this.cartItems.subscribe(
      data => this.cartData = data
    );
  }

  addToCart() {
    const payload: CourseMin = {
      id: this.courseData.id,
      name: this.courseData.title,
      image: '',
      authorName: this.courseData.author,
      startDate: '16 Feb 2045',
      price: this.courseData.price
    };
    this.store.dispatch(new AddCartItem(payload));
  }

  takeThisCourse() {
        if (this.cartData.length > 0) {
          this.showPaymentModal = true;
        } else {
          this.proceedToPay();
        }
  }
  modalGoToCart() {
    this.addToCart();
    this.router.navigate(['/user', 'cart']);
  }
  proceedToPay() {
    const payload: CourseMin = {
      id: this.courseData.id,
      name: this.courseData.title,
      image: '',
      authorName: this.courseData.author,
      startDate: '16 Feb 2045',
      price: this.courseData.price
    };
    this.orderService.setState([payload]);
    this.router.navigate(['/payment']);
  }
}
