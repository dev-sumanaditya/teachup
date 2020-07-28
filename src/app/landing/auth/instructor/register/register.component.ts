import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public instructorForm: FormGroup;
  public selectedFile;
  public submitted = false;
  public dayError = false;
  public timeError = false;

  constructor(
    public fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.instructorForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]*$'),
        ]
      ],
      lastName: [
        '',
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
        '',
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

  fileSelected($e) {
    console.log($e);
  }

}
