import { Component, OnInit, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnDestroy {

  @ViewChild('mainVideo', { static: true }) target: ElementRef;

  public static = false;

  public dummy = [1,1,1,1,1,1,1,1,1];
  public dummy2 = [1,1,1,1];

  public options = {
    fluid: true,
    autoplay: false,
    sources: [
      { src: 'https://dcvideo.b-cdn.net/vid01.mp4', type: 'video/mp4' }
    ],
    techOrder: ['html5'],
    fill: true,
    poster: 'https://i.ibb.co/YRBJKSJ/Fire-Shot-Capture-065-Bright-Green-Architectural-You-Tube-Thumbnail-You-Tube-Thumbnail-www-canva-com.png',
    controls: true,
  };

  public player: videojs.Player;

  constructor() { }

  ngOnInit(): void {
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {});
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

}
