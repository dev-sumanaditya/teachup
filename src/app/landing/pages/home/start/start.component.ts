import { Component, OnInit, ElementRef, OnDestroy, ViewChild } from '@angular/core';
// import videojs from 'video.js';
import { AuthService } from 'src/app/landing/auth/services/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnDestroy {

  @ViewChild('mainVideo', { static: true }) target: ElementRef;

  public static = false;
  public user;
  public pageLoaded = false;
  public dummy = [1,1,1,1,1,1,1,1];
  public dummy2 = [1,1,1,1];
  public options = {
    fluid: true,
    autoplay: false,
    sources: [
      { src: 'https://dcvideo.b-cdn.net/vid01.mp4', type: 'video/mp4' }
    ],
    techOrder: ['html5'],
    fill: true,
    // tslint:disable-next-line:max-line-length
    poster: 'https://i.ibb.co/YRBJKSJ/Fire-Shot-Capture-065-Bright-Green-Architectural-You-Tube-Thumbnail-You-Tube-Thumbnail-www-canva-com.png',
    controls: true,
  };
  // public player: videojs.Player;

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3300,
    dots: true,
    fade: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {});
    this.authService.currentUser.subscribe(
      data => {
        this.user = data;
        this.pageLoaded = true;
      }
    );
  }

  ngOnDestroy(): void {
    // if (this.player) {
    //   this.player.dispose();
    // }
  }

}
