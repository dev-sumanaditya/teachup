import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import {
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from "@angular/router";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.scss"],
})
export class StartComponent implements OnInit {
  public submitted = false;
  public ResetForm: FormGroup;
  public loading = false;
  public error = "";
  public resetDone = false;
  public emailVerified = false;

  public mode;
  public code;

  constructor(
    private authService: AuthService,
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ResetForm = this.fb.group({
      pass: [
        "",
        [
          Validators.required,
          Validators.maxLength(60),
          Validators.minLength(8),
        ],
      ],
      pass2: [
        "",
        [
          Validators.required,
          Validators.maxLength(60),
          Validators.minLength(8),
        ],
      ],
    });

    const queryParams = this.route.snapshot.queryParams;
    if (!queryParams || !queryParams.oobCode || !queryParams.mode) {
      return this.router.navigate["/auth"];
    }
    this.code = queryParams.oobCode;
    this.mode = queryParams.mode;

    if (queryParams.mode === "verifyEmail") {
      this.VerifyEmail();
    }
  }
  get ResetFormControl() {
    return this.ResetForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    if (
      !this.ResetForm.valid ||
      this.ResetForm.value.pass !== this.ResetForm.value.pass2
    ) {
      this.error = "Passwords do not match";
      return;
    }
    await this.reset();
  }

  async reset() {
    try {
      await this.authService.resetPassword(
        this.code,
        this.ResetForm.value.pass
      );
      this.resetDone = true;
    } catch (err) {
      this.error = err;
      this.router.navigate(["/auth"]);
      return;
    }
  }

  async VerifyEmail() {
    console.log(this.code);
    try {
      await this.authService.verifyEmail(this.code);
      this.emailVerified = true;
    } catch (err) {
      this.error = err;
    }
  }
}
