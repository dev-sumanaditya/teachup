import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  modules = {};
  content = "";

  public id;

  secretForm: FormGroup;
  public submitted = false;
  public loading = false;
  public error = null;

  public editorStyle = {
    height: "400px",
    backgroundColor: "#fff",
    "max-width": "720px",
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.http
      .get<any>(environment.apiUrl + "/course/" + this.id + "/details")
      .subscribe(({ data }) => {
        this.secretForm.patchValue({ secret: data.details });
      });

    this.modules = {
      toolbar: [
        ["bold", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
      ],
    };

    this.secretForm = this.fb.group({
      secret: [null, [Validators.required]],
    });
  }

  getSercetFormControl() {
    return this.secretForm.controls;
  }

  submit() {
    this.submitted = true;
    if (this.secretForm.valid) {
      this.loading = true;
      this.http
        .put<any>(environment.apiUrl + "/course", {
          id: this.id,
          details: this.secretForm.value.secret,
        })
        .subscribe(
          (data) => {
            this.loading = false;
            this.error = null;
            this.router.navigate(["/instructor", "courses"]);
          },
          (error) => {
            this.loading = false;
            this.error = error;
          }
        );
    } else {
      this.error = "Please enter a valid input";
    }
  }
}
