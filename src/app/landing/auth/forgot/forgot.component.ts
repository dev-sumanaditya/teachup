import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  public submitted = false;
  public ForgotForm: FormGroup;
  public loading = false;
  public error = '';
  public success = false;

  constructor(
    private authService: AuthService,
    public fb: FormBuilder,
    private router: Router,
  ) {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.ForgotForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(60),
          Validators.minLength(5),
        ],
      ]
    });
  }
  get ForgotFormControl() {
    return this.ForgotForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.ForgotForm.valid) {
      this.verify();
    } else {
      return;
    }
  }

  async verify() {
    try {
      await this.authService.verifyForgot(this.ForgotForm.value.email);
      this.submitted = false;
      this.success = true;
    } catch (error) {
      this.error = error;
    }
  }
}
