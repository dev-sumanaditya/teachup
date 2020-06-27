import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {

  public demourl = '/assets/images/demo/updates.png';

  constructor() { }

  ngOnInit(): void {
  }

}
