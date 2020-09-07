import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  secret = null;
  loading = true;
  error = null;

  constructor(
    private location: Location,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.http
      .get<any>(environment.apiUrl + "/course/" + id + "/details")
      .subscribe(
        ({ data }) => {
          this.secret = data;
          this.loading = false;
          this.error = null;
        },
        (error) => {
          this.loading = false;
          this.error = error;
        }
      );

    // this.http
    //   .get<any>(environment.apiUrl + "/order/")
    //   .subscribe((data) => console.log(data));
  }

  goback() {
    this.location.back();
  }
}
