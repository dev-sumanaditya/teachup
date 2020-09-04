import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { CourseService } from "src/app/landing/pages/user/services/course.service";
import { Store } from "@ngxs/store";
import { AddCartItem } from "src/app/landing/store/actions/cart.action";
import { CourseMin } from "src/app/landing/store/models/cart.model";
import { AuthService } from "src/app/landing/auth/services/auth.service";
import { Router } from "@angular/router";
import { OrderService } from "src/app/landing/services/order.service";
import { tap, filter, switchMap, map } from "rxjs/operators";

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
  public addingToCart = false;
  public addedToCart = false;

  public enrolled = "null";

  constructor(
    private courseService: CourseService,
    private store: Store,
    private auth: AuthService,
    private router: Router,
    private orderService: OrderService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getData();
    this.auth.currentUser
      .pipe(
        tap((data) => {
          this.user = data;
        }),
        filter((data) => !!data.id),
        switchMap(() => {
          return this.getData();
        }),
        tap((data) => {
          this.data = data;
        }),
        switchMap(() => {
          return this.courseService.chechEnrolled(this.data.id);
        }),
        tap(({ data }) => {
          this.enrolled = data.enrolled;
          console.log(data);
        })
      )
      .subscribe();
    this.courseService.addedToCartObs.subscribe((data) => {
      console.log(data);
      this.addedToCart = data;
    });
    this.cd.detectChanges();
  }

  getData() {
    return this.courseService.dataObs;
  }

  addToCart() {
    if (this.user && !this.addedToCart) {
      this.addingToCart = true;
      const payload: CourseMin = {
        id: this.data.id,
        name: this.data.title,
        image: this.data.image,
        authorName: this.data.author.displayName,
        startDate: this.data.startDate,
        price: this.data.price,
      };
      this.store.dispatch(new AddCartItem(payload)).subscribe(
        (data) => {
          this.addingToCart = false;
          this.addedToCart = true;
        },
        (error) => {
          this.addingToCart = false;
        }
      );
    } else if (!this.user) {
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
