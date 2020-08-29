import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-viewer",
  templateUrl: "./viewer.component.html",
  styleUrls: ["./viewer.component.scss"],
})
export class ViewerComponent implements OnInit {
  public data;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.http
      .get<any>(environment.apiUrl + "/blog/" + id)
      .subscribe(({ data }) => {
        this.data = data;
      });
  }

  getDate(data) {
    const date = data.updatedAt;
    return date;
  }
}
