import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public dummy = [1,1,1,1,1,1,1,1,1];

  constructor() { }

  ngOnInit(): void {
  }

}
