import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/landing/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public imgx = true;
  public static = true;
  public user = null;

  public slides = [1,1,1,1,1,1,1];

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3300,
    dots: false,
    fade: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    speed: 500,
    arrows: false
  };

  sub;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
   this.sub = this.auth.currentUser.subscribe(
     data => {
       this.user = data;
     }
   );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
