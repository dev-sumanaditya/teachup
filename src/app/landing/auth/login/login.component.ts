import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public submitted = false;
  public loginForm: FormGroup;
  public loading = false;
  public returnUrl: string;
  public error = '';

  constructor(
    private authService: AuthService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    // this.authService.currentUser.subscribe(
    //   data => {
    //     if (data) {
    //       this.router.navigate(['/']);
    //     }
    //   }
    // );
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(60),
          Validators.minLength(5),
        ],
      ],
      pass: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(60),
        ],
      ],
    });
  }
  get LoginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.login();
    } else {
      return;
    }
  }

  async login() {
    this.loading = true;
    try {
      const user = await this.authService.login(this.loginForm.value.email, this.loginForm.value.pass);
      // localStorage.setItem('currentUser', JSON.stringify(user.user));
      this.authService.currentUserSubject.next(user.user);
      this.router.navigate(['/']);
    } catch (err) {
      this.loading = false;
      this.error = err;
    }
  }

  async loginWithGoogle() {
    const {user} = await this.authService.loginWithGoogle();
    // localStorage.setItem('currentUser', JSON.stringify(user));
    this.authService.currentUserSubject.next(user);
    console.log(user);
    this.router.navigate(['/']);
  }
}
