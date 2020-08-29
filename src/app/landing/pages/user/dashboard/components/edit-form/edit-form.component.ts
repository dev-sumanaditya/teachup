import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/landing/auth/services/auth.service";

@Component({
  selector: "app-edit-form",
  templateUrl: "./edit-form.component.html",
  styleUrls: ["./edit-form.component.scss"],
})
export class EditFormComponent implements OnInit {
  @Input() data;

  @ViewChild("input") input: ElementRef;

  public disabled = true;
  public value = null;

  public submitted = false;
  public error = null;
  public loading = false;
  public user;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.value = this.data.value;

    this.auth.currentUser.subscribe((data) => (this.user = data));
  }

  edit() {
    this.disabled = false;
    this.input.nativeElement.focus();
  }

  async submit() {
    console.log(this.value);
    if (this.value.length === 0 || this.value.length > 60) {
      this.error = "Please enter a valid input";
      return null;
    }
    this.error = null;
    this.loading = true;
    this.disabled = true;
    this.submitted = true;
    const str = {
      [this.data.key]: this.value,
      id: this.user.id,
      uid: this.user.uid,
    };
    try {
      await this.auth.updateUser(str);
      this.loading = false;
    } catch (error) {
      this.error = error;
      this.loading = false;
    }
  }
}
