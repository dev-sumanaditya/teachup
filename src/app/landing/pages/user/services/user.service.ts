import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/landing/auth/services/auth.service";
import { switchMap } from "rxjs/operators";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(@Inject(PLATFORM_ID) private platformId) {}

  uploadUserImage(data) {}

  makeblob(dataURL) {
    if (isPlatformBrowser(this.platformId)) {
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
  }
}
