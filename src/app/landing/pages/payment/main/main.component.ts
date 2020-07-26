import { Component, OnInit, OnDestroy } from '@angular/core';
import { WindowRefService } from 'src/app/landing/services/window-ref.service';
import { Subscription } from 'rxjs';
import { CourseMin } from 'src/app/landing/store/models/cart.model';
import { OrderService } from 'src/app/landing/services/order.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public orderDetails: CourseMin[] = [];

  constructor(
    private winRef: WindowRefService,
    private orderServ: OrderService
  ) {
    this.subscription = this.orderServ.getState().subscribe(
      state => {
        this.orderDetails = state;
      }
    );
  }

  ngOnInit(): void {
  }

  completePayment() {
    if (this.orderDetails.length > 0) {
      alert('This will proceed to razorpay api call');
    } else {
      alert('No items');
    }
  }

  deleteItem(id) {
    this.orderServ.deleteItemFromList(id);
    // recreate order on backend and refetch data;
  }

  createRzpayOrder(data) {
    console.log(data);
    // call api to create order_id
    // this.payWithRazor(order_id);
  }
  payWithRazor(val) {
    const options: any = {
      key: 'rzp_test_key',
      amount: 125500, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: '', // company name or product name
      description: '',  // product description
      image: './assets/logo.png', // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c52cc'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
