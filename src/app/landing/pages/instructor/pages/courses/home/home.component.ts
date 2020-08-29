import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public loading = true;

  public courses = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>(environment.apiUrl + "/course/own")
      .subscribe(({ data }) => {
        this.courses = data;
        this.loading = false;
      });
  }
}
