import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public instructor = {
    name: 'Thomas Frank',
    about: 'YouTuber, Author, Entrepreneur',
    img: '/assets/images/demo/avatar2.webp'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
