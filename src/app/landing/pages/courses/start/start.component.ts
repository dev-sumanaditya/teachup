import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public static = false;
  public categories = [
    {
      name: 'Technology',
      img: 'technology'
    },
    {
      name: 'Finance',
      img: 'finance'
    },
    {
      name: 'Marketing',
      img: 'marketing'
    },
    {
      name: 'Photography',
      img: 'photography'
    },
    {
      name: 'Kids',
      img: 'kids'
    },
    {
      name: 'Management',
      img: 'management'
    },
    {
      name: 'Arts',
      img: 'arts'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
