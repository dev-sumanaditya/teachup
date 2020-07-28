import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/landing/auth/services/auth.service';

@Component({
  selector: 'app-ipanel',
  templateUrl: './ipanel.component.html',
  styleUrls: ['./ipanel.component.scss']
})
export class IpanelComponent implements OnInit {

  public user;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(
      data => {
        console.log(data);
        this.user = data;
      }
    );
  }

}
