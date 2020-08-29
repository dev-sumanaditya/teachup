import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/landing/auth/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-ipanel",
  templateUrl: "./ipanel.component.html",
  styleUrls: ["./ipanel.component.scss"],
})
export class IpanelComponent implements OnInit {
  public user;
  public courses = null;

  constructor(private auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.auth.currentUser.subscribe((data) => {
      this.user = data;
    });

    this.http.get<any>(environment.apiUrl + "/course/own").subscribe((data) => {
      this.courses = data.data;
    });
  }
}
