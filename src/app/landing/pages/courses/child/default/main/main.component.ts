import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/landing/pages/user/services/course.service";
import { Store } from "@ngxs/store";
import { AddCartItem } from "src/app/landing/store/actions/cart.action";
import { CourseMin } from "src/app/landing/store/models/cart.model";
import { Course } from "src/app/landing/store/models/course.model";
import { AuthService } from "src/app/landing/auth/services/auth.service";
import { Router } from "@angular/router";
import { OrderService } from "src/app/landing/services/order.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  public instructor = {
    name: "Thomas Frank",
    about: "YouTuber, Author, Entrepreneur",
    img: "/assets/images/demo/avatar2.webp",
    id: ":id",
  };

  public data;
  public user: null;
  public courseId;

  constructor(
    private courseService: CourseService,
    private store: Store,
    private auth: AuthService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.auth.currentUser.subscribe((data) => {
      this.user = data;
    });
    this.courseService.dataObs.subscribe((data) => {
      this.data = data;
    });
  }

  addToCart() {
    if (this.user) {
      const payload: CourseMin = {
        id: this.data.id,
        name: this.data.title,
        image: this.data.image,
        authorName: this.data.author.displayName,
        startDate: this.data.startDate,
        price: this.data.price,
      };
      this.store.dispatch(new AddCartItem(payload));
    } else {
      this.router.navigate(["/auth"], {
        queryParams: { returnUrl: "/courses/course/" + this.data.id },
      });
    }
  }

  takeThisCourse() {
    if (this.user) {
      const payload: CourseMin = {
        id: this.data.id,
        name: this.data.title,
        image: this.data.image,
        authorName: this.data.author.user.diaplayName,
        startDate: this.data.startDate,
        price: this.data.price,
      };
      this.orderService.setState([payload]);
      this.router.navigate(["/payment"]);
    } else {
      this.router.navigate(["/auth"], {
        queryParams: { returnUrl: "/courses/course/" + this.data.id },
      });
    }
  }
}
