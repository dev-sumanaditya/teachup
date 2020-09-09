import { Component, OnInit, OnDestroy, ɵConsole } from "@angular/core";
import { AuthService } from "src/app/landing/auth/services/auth.service";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { UserService } from "../services/user.service";
import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { tap, switchMap } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public imgx = true;
  public static = true;
  public user = null;
  public mailSent = false;
  public uploading = false;

  public slides = [];
  public isInstructor = false;

  public instructorStatus;

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3300,
    dots: false,
    fade: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  sub;

  imageChangedEvent: any = "";
  croppedImage: any = "";

  uploadPercentage = 0;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.sub = this.auth.currentUser.subscribe((data) => {
      this.user = data;
      console.log(this.user);
      const roles = data.roles;
      if (roles.some((e) => e.name === "INSTRUCTOR")) {
        this.isInstructor = true;
      }
    });

    this.http
      .get<any>(environment.apiUrl + "/instructor/is-instructor")
      .subscribe((data) => {
        this.instructorStatus = data.data.status;
      });

    this.http
      .get<any>(environment.apiUrl + "/course/user")
      .subscribe(({ data }) => {
        this.slides = data;
      });
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

  async upload() {
    this.uploadPercentage = 0;
    this.imageChangedEvent = null;
    this.uploading = true;
    const blob = this.userService.makeblob(this.croppedImage);
    const name = `${Math.floor(Math.random() * 1000)}${
      blob.type.split("/").length > 1 ? "." + blob.type.split("/")[1] : ""
    }`;
    const image = new File([blob], name, { type: blob.type });

    const { data } = await this.http
      .get<any>(environment.apiUrl + "/user/image", {
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
    const res = await this.http
      .post<any>(data.url, formData, {
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

    await this.auth.updateUser({
      id: this.user.id,
      uid: this.user.uid,
      photoURL:
        "https://teachup-space.sgp1.digitaloceanspaces.com/" + data.fields.key,
    });
  }

  async sendMail() {
    const user = await this.auth.currentUser;
    try {
      await this.auth.sendEmailVerification();
      this.mailSent = true;
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
