import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
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
  ) {}

  ngOnInit(): void {
    this.auth.currentUser.subscribe((data) => {
      this.data = data;
      console.log(data);
    });

    this.instructorForm = this.fb.group({
      phoneNumber: ["", [Validators.required]],
      areaOfExpertise: ["", [Validators.required, Validators.maxLength(60)]],
      maxNoOfStudents: [
        null,
        [Validators.required, Validators.pattern("^[1-9][0-9]*0$")],
      ],
      weekdays: [false],
      weekend: [false],
      morning: [false],
      afternoon: [false],
      evening: [false],
      about: [
        "",
        [
          Validators.required,
          Validators.maxLength(2000),
          Validators.minLength(1),
        ],
      ],
      linkedin: [
        "",
        [
          Validators.minLength(10),
          Validators.pattern("^https:\\/\\/[a-z]{2,3}\\.linkedin\\.com\\/.*$"),
        ],
      ],
      facebook: ["", [Validators.minLength(10)]],
      twitter: ["", [Validators.minLength(10)]],
      instagram: ["", [Validators.minLength(10)]],
      file: ["", []],
    });
  }

  get FormControl() {
    return this.instructorForm.controls;
  }

  async Submit() {
    this.submitted = true;
    console.log(this.instructorForm.valid);
    if (
      !this.instructorForm.controls.weekdays.value &&
      !this.instructorForm.controls.weekend.value
    ) {
      this.dayError = true;
      alert("Please select Availability");
      return false;
    } else {
      this.dayError = false;
    }
    // tslint:disable-next-line:max-line-length
    if (
      !this.instructorForm.controls.morning.value &&
      !this.instructorForm.controls.afternoon.value &&
      !this.instructorForm.controls.evening.value
    ) {
      this.timeError = true;
      alert("Please Select Timing");
      return false;
    } else {
      this.timeError = false;
    }
    const data = this.instructorForm.value;
    console.log(data);
    data.availability = ["weekdays", "weekend"]
      .filter((day) => !!data[day])
      .join(",");
    data.timing = ["morning", "afternoon", "evening"]
      .filter((day) => !!data[day])
      .join(",");
    data.linkedinProfile =
      !!data.linkedinProfile &&
      !!data.linkedinProfile.trim() &&
      data.linkedinProfile.trim().length > 0
        ? data.linkedinProfile
        : null;
    data.instaProfile =
      !!data.instaProfile &&
      !!data.instaProfile.trim() &&
      data.instaProfile.trim().length > 0
        ? data.instaProfile
        : null;
    data.fbProfile =
      !!data.fbProfile &&
      !!data.fbProfile.trim() &&
      data.fbProfile.trim().lenght > 0
        ? data.fbProfile
        : null;
    data.twitterProfile =
      !!data.twitterProfile &&
      !!data.twitterProfile.trim() &&
      data.twitterProfile.trim().lenght > 0
        ? data.twitterProfile
        : null;
    if (this.instructorForm.valid && !this.dayError && !this.timeError) {
      const insData = await this.http
        .post<any>(environment.apiUrl + "/instructor", data)
        .toPromise();
      if (this.selectedFile) {
        const imgData = await this.http
          .get<any>(
            environment.apiUrl + "/instructor/" + insData.data.id + "/resume",
            {
              params: {
                fileKey: this.selectedFile.name,
                fileType: this.selectedFile.type,
              },
            }
          )
          .toPromise();
        await this.uploadFile(imgData.data);
        const updatedData = await this.http
          .post<any>(environment.apiUrl + "/instructor/resume", {
            ...insData.data,
            file:
              "https://teachup-space.sgp1.digitaloceanspaces.com/resume/" +
              this.selectedFile.name,
          })
          .toPromise();
      }

      this.router.navigate(["/auth", "instructor", "review"]);
    }
  }

  fileSelected(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.selectedFile = file;
  }

  async uploadFile(data: any) {
    const formData = new FormData();
    Object.keys(data.fields).forEach((key) => {
      formData.append(key, data.fields[key]);
    });
    formData.append("file", this.selectedFile);
    return this.http
      .post<any>(data.url, formData, {
        reportProgress: true,
        observe: "events",
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log("Request has been made!");
              break;
            case HttpEventType.ResponseHeader:
              console.log("Response header has been received!");
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log("User successfully created!", event.body);
              setTimeout(() => {
                this.progress = 0;
              }, 1500);
          }
        })
      )
      .toPromise();
  }
}
