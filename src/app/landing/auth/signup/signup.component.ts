import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public submitted = false;
  public signupForm: FormGroup;
  public loading = false;
  public returnUrl: string;
  public error = '';

  constructor(
    private serv: AuthService,
    public fb: FormBuilder,
    private router: Router
  ) {
    if (this.serv.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(60), Validators.minLength(5)]],
      pass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(60)]]
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

  register() {
    this.loading = true;
    this.serv.registerUser(this.signupForm.value.email, this.signupForm.value.pass, 'student')
    .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  get SignupFormControl() {
    return this.signupForm.controls;
  }
}
