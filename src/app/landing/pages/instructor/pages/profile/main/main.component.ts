import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  instructor = null;

  editform: FormGroup;

  loading = false;
  error = null;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.http
      .get<any>(environment.apiUrl + "/instructor/is-instructor/")
      .subscribe(({ data }) => {
        this.instructor = data.instructor;
        this.editform.patchValue({
          ...this.instructor,
        });
      });

    this.editform = this.fb.group({
      intro: [null, []],
      about: [null, []],
      fbProfile: [null, []],
      linkedinProfile: [null, []],
      twitterProfile: [null, []],
      instaProfile: [null, []],
    });
  }

  submit() {
    this.loading = true;
    console.log(this.editform.value);
    if (this.editform.valid) {
      this.http
        .put<any>(environment.apiUrl + "/instructor", {
          ...this.instructor,
          ...this.editform.value,
        })
        .subscribe(
          ({ data }) => {
            this.error = null;
            this.loading = false;
            console.log(data);
            this.instructor = data;
            this.editform.patchValue({
              ...data,
            });
          },
          (error) => {
            this.error = error;
            this.loading = false;
          }
        );
    }
  }
}
