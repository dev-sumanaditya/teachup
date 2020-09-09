import { Component, OnInit, Input, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-updates",
  templateUrl: "./updates.component.html",
  styleUrls: ["./updates.component.scss"],
})
export class UpdatesComponent implements OnInit {
  @Input() data: any;

  public demourl = "/assets/images/demo/updates.png";

  constructor(@Inject(PLATFORM_ID) private platformId) {}

  ngOnInit(): void {}

  extractContent(s) {
    if (isPlatformBrowser(this.platformId)) {
      const span = document.createElement("span");
      span.innerHTML = s;
      const str = span.textContent || span.innerText;
      return str.substring(0, 120);
    }
  }
}
