import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/landing/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user = {
    image: '/assets/images/demo/avatar.jpg'
  };
  public imgx = false;
  public static = true;
  public userdata = {
    firstName: '',
    lastName: '',
    username: '',
    role: {
      name: '',
      uuid: ''
    },
    uuid: '',
    createdAt: ''
  };

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

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    const uuid = JSON.parse(localStorage.getItem('currentUser')).uuid;
    this.auth.getUserData(uuid)
    .subscribe(data => {
      this.userdata = data;
    },
    err => {
      console.log(err);
    });
  }

}
