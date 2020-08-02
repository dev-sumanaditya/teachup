import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public instructorForm: FormGroup;
  public selectedFile: File = null;
  public submitted = false;
  public dayError = false;
  public timeError = false;
  public data = null;
  public progress = null;


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(
      data => this.data = data
    );

    this.instructorForm = this.fb.group({
      firstName: [
        this.data.displayName.split(' ')[0],
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]*$'),
        ]
      ],
      lastName: [
        this.data.displayName.split(' ')[1],
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]*$'),
        ]
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'),
        ]
      ],
      email: [
        this.data.email,
        [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
        ],
      ],
      expertise: [
        '',
        [
          Validators.required,
          Validators.maxLength(60)
        ]
      ],
      maxStudents: [
        '',
        [
          Validators.required,
          Validators.pattern('^[1-9][0-9]*0$')
        ]
      ],
      weekdays: [
        false
      ],
      weekend: [
        false
      ],
      morning: [
        false
      ],
      afternoon: [
        false
      ],
      evening: [
        false
      ],
      about: [
        '',
        [
          Validators.required,
          Validators.maxLength(2000),
          Validators.minLength(80)
        ]
      ],
      linkedin: [
        '',
        [
          Validators.minLength(10),
          Validators.pattern('^https:\\/\\/[a-z]{2,3}\\.linkedin\\.com\\/.*$')
        ]
      ],
      facebook: [
        '',
        [
          Validators.minLength(10)
        ]
      ],
      twitter: [
        '',
        [
          Validators.minLength(10)
        ]
      ],
      instagram: [
        '',
        [
          Validators.minLength(10)
        ]
      ],
      file: [
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  get FormControl() {
    return this.instructorForm.controls;
  }

  Submit() {
    this.submitted = true;
    if (!this.instructorForm.controls.weekdays.value && !this.instructorForm.controls.weekend.value) {
      this.dayError = true;
      alert('Please select Availability');
      return false;
    } else {
      this.dayError = false;
    }
    // tslint:disable-next-line:max-line-length
    if (!this.instructorForm.controls.morning.value && !this.instructorForm.controls.afternoon.value && !this.instructorForm.controls.evening.value) {
      this.timeError = true;
      alert('Please Select Timing');
      return false;
    } else {
      this.timeError = false;
    }
    if (this.instructorForm.valid && !this.dayError && !this.timeError) {
      this.router.navigate(['/auth', 'instructor', 'review']);
      console.log(this.instructorForm.value);
    }
  }

  fileSelected(event) {
    console.log('fired');
    const file = (event.target as HTMLInputElement).files[0];
    this.selectedFile = file;
  }
  uploadFile(data: File) {
    return this.http.post<any>(environment.apiUrl + '/something', data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map(event => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
      }
    }));
  }

}
