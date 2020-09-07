import {
  Component,
  OnInit,
  OnDestroy,
  ɵConsole,
  ChangeDetectorRef,
} from "@angular/core";
import { WindowRefService } from "src/app/landing/services/window-ref.service";
import { Subscription, Observable } from "rxjs";
import { OrderService } from "src/app/landing/services/order.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { AuthService } from "src/app/landing/auth/services/auth.service";
import { Select, Store } from "@ngxs/store";
import { CartState } from "src/app/landing/store/states/cart.state";
import { CourseMin } from "src/app/landing/store/models/cart.model";
import { CartService } from "src/app/landing/services/cart.service";
import { DeleteCartItem } from "src/app/landing/store/actions/cart.action";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit, OnDestroy {
  @Select(CartState.getCartItems) cartItems: Observable<CourseMin[]>;

  private subscription: Subscription;
  public orderDetails: any[] = [];
  public price = 0;

  public couponForm: FormGroup;
  public couponSubmitted = false;
  public couponLoading = false;
  public couponResponse = null;

  public appliedCoupon = null;

  public paymentProcessing = false;
  public paymentSuccessful = false;
  public paymentData = null;

  public totalAmount;

  public user;

  public cartData;

  public sub;

  constructor(
    private winRef: WindowRefService,
    private orderServ: OrderService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private cd: ChangeDetectorRef,
    private cartService: CartService,
    private store: Store
  ) {}

  get couponFormControl() {
    return this.couponForm.controls;
  }

  ngOnInit(): void {
    this.subscription = this.orderServ.getState().subscribe((state) => {
      if (state.length < 1) {
        this.router.navigate(["/user", "cart"]);
      }
      this.orderDetails = state;
      this.checkPrice(state);
      // set price for state.
    });

    this.sub = this.cartItems.subscribe((data) => {
      this.cartData = data;
    });

    this.couponForm = this.fb.group({
      couponCode: [null, [Validators.required]],
    });

    this.auth.currentUser.subscribe((data) => (this.user = data));
  }

  checkPrice(data) {
    this.price = 0;
    data.forEach((el) => {
      this.price += el.price;
    });
  }

  couponSubmit() {
    this.couponSubmitted = true;
    if (this.couponForm.invalid) {
      return;
    }
    this.couponLoading = true;
    const coupondata = { ...this.couponForm.value };
    this.http
      .post<any>(environment.apiUrl + "/order/coupon/apply", {
        couponCode: coupondata.couponCode,
        courses: this.orderDetails,
      })
      .subscribe(
        ({ data }) => {
          if (data.couponDetails.couponApplied) {
            this.appliedCoupon = data.order.coupon;
            console.log(data);
          }
          this.couponLoading = false;
          this.couponResponse = data;
        },
        (error) => {
          this.couponLoading = false;
          this.appliedCoupon = false;
        }
      );
  }

  removeCoupon() {
    this.couponResponse = null;
    this.appliedCoupon = null;
    this.couponSubmitted = false;
  }

  async completePayment() {
    this.paymentProcessing = true;
    try {
      if (!this.orderDetails.length) {
        this.paymentProcessing = false;
        throw new Error("no course");
      }
      let order = null;
      if (this.couponResponse) {
        order = await this.http
          .post<any>(environment.apiUrl + "/order", {
            orderId: this.couponResponse.order.id,
            courses: this.orderDetails,
          })
          .toPromise();
      } else {
        order = await this.http
          .post<any>(environment.apiUrl + "/order", {
            courses: this.orderDetails,
          })
          .toPromise();
      }
      console.log(order);
      this.createRzpayOrder(order);
    } catch (error) {
      this.paymentProcessing = false;
      this.router.navigate(["/user", "cart"]);
    }
  }

  createRzpayOrder(order) {
    this.payWithRazor(order.data);
  }
  payWithRazor(val) {
    console.log(val.paidAmount);
    const options: any = {
      key: environment.razorpay.key,
      amount: val.paidAmount * 100,
      currency: val.currency,
      name: "Teachup.io", // company name or product name
      description: this.orderDetails.map((order) => order.id).join(","), // product description
      image: "https://teachup.io/assets/logo/T.jpg", // company logo or product image
      order_id: val.razorpayOrderId, // order_id created by you in backend
      modal: {
        escape: false,
      },
      prefill: {
        name: this.user.displayName,
        email: this.user.email,
        contact: this.user.phoneNumber,
      },
      notes: {},
      theme: {
        color: "#0c52cc",
      },
    };
    options.handler = (response, error) => {
      if (error) {
        console.log(error);
        return;
      }
      options.response = response;
      this.http
        .get<any>(environment.apiUrl + "/order/id/" + val.id)
        .subscribe(({ data }) => {
          this.paymentProcessing = false;
          this.paymentSuccessful = true;
          this.paymentData = data;
          this.orderDetails.forEach((el) => {
            console.log(this.orderDetails);
            this.cartData.forEach((item) => {
              console.log(this.cartData);
              if (item.id === el.id) {
                console.log("removing from cart");
                this.store.dispatch(new DeleteCartItem(el.id));
              }
            });
          });
          this.cd.detectChanges();
        });
      // call your backend api to verify payment signature & capture transaction
    };
    options.modal.ondismiss = () => {
      // handle the case when user closes the form while transaction is in progress
      console.log("Transaction cancelled.");
      this.paymentProcessing = false;
      this.http
        .get<any>(environment.apiUrl + "/order/id/" + val.id)
        .subscribe((data) => {
          console.log(data);
        });
    };

    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
  // deleteItem(id) {
  //   this.orderServ.deleteItemFromList(id);
  // }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.sub.unsubscribe();
  }
}
