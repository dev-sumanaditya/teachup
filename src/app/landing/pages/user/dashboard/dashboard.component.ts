import { Component, OnInit, OnDestroy, ɵConsole } from "@angular/core";
import { AuthService } from "src/app/landing/auth/services/auth.service";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { UserService } from "../services/user.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

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

  public slides = [1, 1, 1, 1, 1, 1, 1];
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
  };

  sub;

  imageChangedEvent: any = "";
  croppedImage: any = "";

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.sub = this.auth.currentUser.subscribe((data) => {
      this.user = data;
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

  upload() {
    this.imageChangedEvent = null;
    this.uploading = true;
    this.userService.uploadImage(this.croppedImage).subscribe((data) => {
      console.log(data);
    });
  }

  sendMail() {
    this.mailSent = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
