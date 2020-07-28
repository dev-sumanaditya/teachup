import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/landing/auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public user;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(data => {
      this.user = data;
    })
  }

}
