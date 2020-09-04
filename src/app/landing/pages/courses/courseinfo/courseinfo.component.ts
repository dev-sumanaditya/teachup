import { Component, OnInit } from "@angular/core";
import { Course } from "src/app/landing/store/models/course.model";
import { CourseService } from "../../user/services/course.service";
import { CourseMin } from "src/app/landing/store/models/cart.model";
import { Store, Select } from "@ngxs/store";
import { AddCartItem } from "src/app/landing/store/actions/cart.action";
import { CartState } from "src/app/landing/store/states/cart.state";
import { Observable } from "rxjs";
import { OrderService } from "src/app/landing/services/order.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/landing/auth/services/auth.service";
import { database } from "firebase";
import { tap, filter, switchMap } from "rxjs/operators";

@Component({
  selector: "app-courseinfo",
  templateUrl: "./courseinfo.component.html",
  styleUrls: ["./courseinfo.component.scss"],
})
export class CourseinfoComponent implements OnInit {
  public menu = [
    {
      name: "Overview",
      url: "./",
    },
    {
      name: "About",
      url: "about",
    },
    // {
    //   name: "Discussions",
    //   url: "discussions",
    // },
    // {
    //   name: "Reviews",
    //   url: "reviews",
    // },
  ];

  public user = null;
  public showPaymentModal = false;
  public courseData = null;
  public cartData: CourseMin[];
  public courseID;

  public addingToCart = false;
  public addedToCart = false;

  public enrolled = 0;

  @Select(CartState.getCartItems) cartItems: Observable<CourseMin[]>;

  constructor(
    private cService: CourseService,
    private store: Store,
    private orderService: OrderService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseID = this.route.snapshot.params.id;

    this.auth.currentUser
      .pipe(
        tap((data) => {
          this.user = data;
        }),
        filter((data) => !!data.id),
        switchMap(() => {
          return this.cService.chechEnrolled(this.courseID);
        }),
        tap(({ data }) => {
          this.enrolled = data.enrolled;
          console.log(data);
        })
      )
      .subscribe();

    this.cService
      .getDefaultData(this.courseID)
      .pipe(
        tap(({ data }) => {
          this.courseData = data;
        }),
        filter(() => !!this.courseData),
        switchMap(() => {
          return this.cartItems;
        }),
        tap((items) => {
          this.cartData = items;
          console.log(items);
          console.log(this.courseData);
          items.forEach((el) => {
            if (el.id === this.courseData.id) {
              this.addedToCart = true;
              this.cService.setAddedToCart(true);
            }
          });
        })
      )
      .subscribe();
  }
  addToCart() {
    if (this.user && !this.addedToCart) {
      this.addingToCart = true;
      const payload: any = {
        id: this.courseData.id,
        title: this.courseData.title,
        image: this.courseData.image,
        authorName: this.courseData.author.user.displayName,
        startDate: this.courseData.startDate,
        price: this.courseData.price,
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
        queryParams: { returnUrl: "/courses/course/" + this.courseData.id },
      });
    }
  }

  takeThisCourse() {
    if (this.user) {
      if (this.cartData.length > 0) {
        this.showPaymentModal = true;
      } else {
        this.proceedToPay();
      }
    } else {
      this.router.navigate(["/auth"], {
        queryParams: { returnUrl: "/courses/course/" + this.courseData.id },
      });
    }
  }
  modalGoToCart() {
    this.addToCart();
    this.router.navigate(["/user", "cart"]);
  }
  proceedToPay() {
    const payload: any = {
      id: this.courseData.id,
      title: this.courseData.title,
      image: this.courseData.image,
      authorName: this.courseData.author.displayName,
      startDate: this.courseData.startDate,
      price: this.courseData.price,
    };
    this.orderService.setState([payload]);
    this.router.navigate(["/payment"]);
  }
}
