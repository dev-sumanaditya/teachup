import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/landing/auth/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  public verified = false;
  public verifying = false;

  public user = null;
  public sub;

  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
    this.sub = this.authServ.currentUser.subscribe(
      data => {
        this.user = data;
      }
    );
  }

  public verify() {
    this.verifying = true;
    this.verified = true;
  }
  public changePass() {
    this.verified = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
