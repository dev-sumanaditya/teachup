import { Component, OnInit } from '@angular/core';

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

  public slides = [1,1,1,1,1,1,1,1,1,1];

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

  constructor() { }

  ngOnInit(): void {
  }

}
