import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  public submitted = false;
  public signupForm: FormGroup;
  public loading = false;
  public returnUrl: string;
  public error = "";

  constructor(
    private authService: AuthService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(60),
          Validators.minLength(5),
        ],
      ],
      pass: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(60),
        ],
      ],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      this.register();
    } else {
      return;
    }
  }

  async register() {
    try {
      this.loading = true;
      const email = this.signupForm.value.email;
      const pass = this.signupForm.value.pass;
      const { data } = await this.authService.registerUser(email, pass);
      this.authService.currentUserSubject.next(data);
      this.router.navigate(["/"]);
    } catch (err) {
      this.loading = false;
      this.error = err;
    }
  }

  get SignupFormControl() {
    return this.signupForm.controls;
  }

  async googleLogin() {
    const { user } = await this.authService.loginWithGoogle();
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.authService.currentUserSubject.next(user);
    this.router.navigate(["/"]);
  }
}
