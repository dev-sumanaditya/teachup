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
  public categoryData = null;

  public featured = null;
  public courses = [];

  public id;
  public loading;
  public error;

  public sub;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((data) => {
      this.id = data.id;
      this.getData();
    });
  }

  async getData() {
    this.loading = true;
    this.courses = [];
    this.featured = null;
    this.error = "";
    try {
      const { data } = await this.http
        .get<any>(
          environment.apiUrl + "/category/" + this.route.snapshot.params.id
        )
        .toPromise();
      console.log(data);
      this.loading = false;
      this.categoryData = {
        id: data.id,
        image: data.image,
        name: data.name,
      };
      if (data.courses.length === 0) {
        return;
      }
      this.featured = data.courses.slice(0, 1)[0];
      this.courses = data.courses.slice(1, data.courses.length);
    } catch (error) {
      console.log(error);
      this.loading = false;
      this.error = error;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
