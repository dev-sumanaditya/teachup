import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public verified = false;
  public verifying = false;

  constructor() { }

  ngOnInit(): void {
  }

  public verify() {
    // this.verifying = true;
    this.verified = true;
  }
  public changePass() {
    this.verified = false;
  }

}
