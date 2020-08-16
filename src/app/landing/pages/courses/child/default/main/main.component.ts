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

  public defaultData: Course;
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
      this.defaultData = data;
    });
  }

  addToCart() {
    if (this.user) {
      const dat: CourseMin = {
        id: "someid",
        name: "Some title",
        image: "",
        authorName: "some author name",
        startDate: "12 July 2022",
        price: 7833.0,
      };
      this.store.dispatch(new AddCartItem(dat));
    } else {
      this.router.navigate(["/auth"], {
        queryParams: { returnUrl: "/courses/course/" + this.defaultData.id },
      });
    }
  }

  takeThisCourse() {
    if (this.user) {
      const payload: CourseMin = {
        id: this.defaultData.id,
        name: this.defaultData.title,
        image: this.defaultData.image,
        authorName: this.defaultData.author,
        startDate: this.defaultData.startDate,
        price: this.defaultData.price,
      };
      this.orderService.setState([payload]);
      this.router.navigate(["/payment"]);
    } else {
      this.router.navigate(["/auth"], {
        queryParams: { returnUrl: "/courses/course/" + this.defaultData.id },
      });
    }
  }
}
