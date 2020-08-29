import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-updates",
  templateUrl: "./updates.component.html",
  styleUrls: ["./updates.component.scss"],
})
export class UpdatesComponent implements OnInit {
  @Input() data: any;

  public demourl = "/assets/images/demo/updates.png";

  constructor() {}

  ngOnInit(): void {}

  extractContent(s) {
    const span = document.createElement("span");
    span.innerHTML = s;
    const str = span.textContent || span.innerText;
    return str.substring(0, 120);
  }
}
