import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.scss"],
})
export class StartComponent implements OnInit, OnDestroy {
  public user = null;
  public sub;

  public submitted = false;
  public UserForm: FormGroup;
  public loading = false;
  public error = "";

  constructor(
    private auth: AuthService,
    private router: Router,
    private authService: AuthService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sub = this.auth.currentUser.subscribe((data) => {
      this.user = data;
      if (this.user.displayName) {
        this.router.navigate(["/"]);
      }
    });

    this.UserForm = this.fb.group({
      fName: [
        null,
        [
          Validators.required,
          Validators.maxLength(60),
          Validators.minLength(1),
        ],
      ],
      lName: [null, [Validators.maxLength(60)]],
    });
  }
  get UserFormControl() {
    return this.UserForm.controls;
  }

  public onSubmit() {
    this.submitted = true;
    if (this.UserForm.invalid) {
      return;
    }
    this.loading = true;
    this.updateUser();
  }

  async updateUser() {
    try {
      const usr = {
        displayName:
          this.UserForm.value.fName + " " + this.UserForm.value.lName,
        id: this.user.id,
        uid: this.user.uid,
      };
      console.log(usr);
      await this.authService.updateUser(usr);
      this.router.navigate(["/"]);
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  }

  public logout() {
    this.auth.logout();
    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
