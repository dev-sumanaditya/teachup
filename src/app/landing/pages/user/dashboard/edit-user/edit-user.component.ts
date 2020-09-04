import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/landing/auth/services/auth.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { UserService } from "../../services/user.service";
import { environment } from "src/environments/environment";
import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit {
  public user;
  public disabled = true;
  public imageSRC = null;

  public countries = [];

  form: FormGroup;
  mask: string;
  example: string;

  nameOptions = {
    label: "Name",
    placeHolder: "Your Name",
    type: "text",
    value: "",
    key: "displayName",
  };

  phoneOptions = {
    label: "Phone",
    placeHolder: "Your Phone",
    type: "text",
    value: "",
    key: "phoneNumber",
  };

  imageChangedEvent: any = "";
  croppedImage: any = "";
  uploadPercentage = 0;
  uploading = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((data) => {
      this.user = data;
      this.nameOptions.value = data.displayName;
      this.phoneOptions.value = data.phoneNumber;
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
}
