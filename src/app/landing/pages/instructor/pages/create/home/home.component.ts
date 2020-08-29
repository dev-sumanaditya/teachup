import { Component, OnInit } from "@angular/core";
import { IMyDpOptions } from "mydatepicker";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient, HttpEventType, HttpEvent } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  modules = {};
  content = "";

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: "dd.mm.yyyy",
    showTodayBtn: false,
    markCurrentDay: true,
    minYear: 2020,
    maxYear: 2022,
    openSelectorOnInputClick: true,
  };
  public editorStyle = {
    height: "400px",
    backgroundColor: "#fff",
    "max-width": "720px",
  };

  public lessons = [];
  public lessonForm: FormGroup;
  public lessonSubmitted = false;
  public lessonError = "";

  public createForm: FormGroup;
  public createFormSubmitted = false;
  public createFormError = "";

  imageChangedEvent: any = "";
  croppedImage: any = "";
  public imageUrl: "no image";

  public image = null;
  public uploading = false;
  public uploadPercentage = null;

  public categories = [];

  public dateModel: any = { date: { year: 2018, month: 10, day: 9 } };

  public loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get<any>(environment.apiUrl + "/category").subscribe((data) => {
      this.categories = data.data;
    });

    this.lessonForm = this.fb.group({
      lessonName: [
        "",
        [
          Validators.required,
          Validators.maxLength(60),
          Validators.minLength(10),
        ],
      ],
      lessonDuration: [
        "",
        [
          Validators.required,
          Validators.min(10),
          Validators.max(360),
          Validators.pattern("^[1-9][0-9]*0$"),
        ],
      ],
    });

    this.createForm = this.fb.group({
      title: ["", [Validators.required]],
      header: ["", [Validators.required]],
      description: ["", [Validators.required]],
      lessons: [this.lessons],
      price: [null, [Validators.required]],
      startDate: [this.dateModel, [Validators.required]],
      longDescription: ["", [Validators.required]],
      categories: [null, [Validators.required]],
      level: [null, [Validators.required]],
      image: [this.imageUrl, []],
    });

    this.modules = {
      toolbar: [
        ["bold", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
      ],
    };
  }

  get LessonFormControl() {
    return this.lessonForm.controls;
  }

  get CreateFormControl() {
    return this.createForm.controls;
  }

  onSubmit() {
    this.lessonSubmitted = true;
    if (this.lessonForm.valid) {
      this.addLesson(
        this.lessonForm.value.lessonName,
        this.lessonForm.value.lessonDuration
      );
    } else {
      return;
    }
  }
  async onSubmit2() {
    this.createFormSubmitted = true;
    if (this.createForm.valid && this.lessons.length > 0) {
      this.loading = true;
      const courseformData = this.createForm.value;
      courseformData.categories = [courseformData.categories];
      courseformData.startDate = new Date(
        courseformData.startDate.date.year,
        courseformData.startDate.date.month,
        courseformData.startDate.date.day
      );
      this.uploading = true;
      const blob = this.makeblob(this.croppedImage);
      const name = `${Math.floor(Math.random() * 1000)}${
        blob.type.split("/").length > 1 ? "." + blob.type.split("/")[1] : ""
      }`;
      const image = new File([blob], name, { type: blob.type });

      const { data } = await this.http
        .get<any>(environment.apiUrl + "/course/image", {
          params: {
            fileKey: name,
            fileType: image.type,
          },
        })
        .toPromise();

      const formData = new FormData();
      Object.keys(data.fields).forEach((key) => {
        formData.append(key, data.fields[key]);
      });

      formData.append("file", image);
      this.uploadPercentage = 0;
      const response = await this.http
        .post(data.url, formData, {
          reportProgress: true,
          observe: "events",
        })
        .pipe(
          tap((event: HttpEvent<any> & { loaded: number; total: number }) => {
            switch (event.type) {
              case HttpEventType.Sent:
                break;
              case HttpEventType.Response: {
                this.uploading = false;
                break;
              }
              case 1: {
                if (
                  Math.round(this.uploadPercentage) !==
                  Math.round((event.loaded / event.total) * 100)
                ) {
                  this.uploadPercentage =
                    Math.round(event.loaded / event.total) * 100;
                }
                break;
              }
            }
          })
        )
        .toPromise();

      courseformData.image =
        "https://teachup-space.sgp1.digitaloceanspaces.com/" + data.fields.key;

      this.http
        .post<any>(environment.apiUrl + "/course", courseformData)
        .subscribe(
          (d) => {
            this.router.navigate(["/instructor", "courses"]);
          },
          (error) => {
            this.createFormError = error;
          }
        );
    } else {
      this.createFormError = "Please enter valid details";
    }
  }

  selectImage() {
    this.image = this.croppedImage;
    this.imageChangedEvent = null;
  }
  makeblob(dataURL) {
    const BASE64_MARKER = ";base64,";
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }

  changedEditor($event) {
    // console.log($event);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  loadImageFailed() {
    alert("failed to load image");
  }

  addLesson(nm, dtn) {
    this.lessons.push({
      id: Math.floor(Math.random() * 9999999),
      name: nm,
      duration: dtn,
    });
    this.lessonSubmitted = false;
  }
  removeLesson(id) {
    const filteredArray = this.lessons.filter((item) => {
      return item.id !== id;
    });
    this.lessons = filteredArray;
  }
}
