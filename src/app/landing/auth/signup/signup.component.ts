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
    private authService: AuthService,
    public fb: FormBuilder,
    private router: Router
  ) {
    if (localStorage.getItem('currentUser')) {
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

  async register() {
    this.loading = true;
    const email = this.signupForm.value.email;
    const pass = this.signupForm.value.pass;
    const user = await this.authService.registerUser(email, pass);
    console.log(user);
  }

  get SignupFormControl() {
    return this.signupForm.controls;
  }
}
