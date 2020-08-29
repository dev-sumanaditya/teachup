import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.scss"],
})
export class StartComponent implements OnInit {
  public static = false;
  public categories = [];

  public courses = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>(environment.apiUrl + "/category")
      .subscribe(({ data }) => {
        this.categories = data;
      });

    this.http.get<any>(environment.apiUrl + "/course").subscribe(({ data }) => {
      this.courses = data;
    });
  }
}
