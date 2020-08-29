import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit, OnDestroy {
  public data;
  public id;
  public loading;
  public error;

  public sub;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((data) => {
      this.id = data.id;
      this.loading = true;
      this.getData();
    });
  }

  async getData() {
    try {
      const data = await this.http
        .get<any>(
          environment.apiUrl + "/category/" + this.route.snapshot.params.id
        )
        .toPromise();
      this.data = data.data;
      this.loading = false;
      this.error = "";
    } catch (error) {
      this.loading = false;
      this.error = error;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
