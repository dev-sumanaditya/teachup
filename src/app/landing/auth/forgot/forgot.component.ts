import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"],
})
export class ForgotComponent implements OnInit {
  public submitted = false;
  public ForgotForm: FormGroup;
  public loading = false;
  public error = "";
  public success = false;

  constructor(private authService: AuthService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.ForgotForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(140),
          Validators.minLength(5),
        ],
      ],
    });
  }
  get ForgotFormControl() {
    return this.ForgotForm.controls;
  }

  onSubmit() {
    if (this.loading) {
      return;
    }
    this.submitted = true;
    if (this.ForgotForm.valid) {
      this.verify();
      this.loading = true;
    } else {
      this.error = "Enter a valid email";
      return;
    }
  }

  async verify() {
    try {
      await this.authService.verifyForgot(this.ForgotForm.value.email);
      this.submitted = false;
      this.success = true;
      this.error = null;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error =
        "Error: There is no user record corresponding to this email address.";
    }
  }
}
