import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courseinfo',
  templateUrl: './courseinfo.component.html',
  styleUrls: ['./courseinfo.component.scss']
})
export class CourseinfoComponent implements OnInit {

  public menu = [
    {
      name: 'Overview',
      url: './'
    },
    {
      name: 'About',
      url: 'about'
    },
    {
      name: 'Resources',
      url: 'resources'
    },
    {
      name: 'Discussions',
      url: 'discussions'
    },
    {
      name: 'Reviews',
      url: 'reviews'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
