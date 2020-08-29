import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/landing/auth/services/auth.service";
import { FormGroup, FormBuilder } from "@angular/forms";

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

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((data) => {
      this.user = data;
      this.nameOptions.value = data.displayName;
      this.phoneOptions.value = data.phoneNumber;
    });
  }
}
