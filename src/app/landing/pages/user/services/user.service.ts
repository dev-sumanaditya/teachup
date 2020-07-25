import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/landing/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  uploadImage(data) {
    const uploadData = new FormData();
    let uuid;
    this.auth.currentUser.subscribe(
      dat => uuid = dat.uuid,
      err => console.log(err)
    );
    uploadData.append('userImage', data, uuid);

    return this.http.post<any>(environment.apiUrl + '/userimage', uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
