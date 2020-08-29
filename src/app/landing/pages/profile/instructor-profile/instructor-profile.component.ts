import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-instructor-profile",
  templateUrl: "./instructor-profile.component.html",
  styleUrls: ["./instructor-profile.component.scss"],
})
export class InstructorProfileComponent implements OnInit {
  public data = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.http
      .get<any>(environment.apiUrl + "/instructor/" + id)
      .subscribe(({ data }) => {
        this.data = data;
      });
  }
}
