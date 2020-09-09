import { Component, AfterViewInit, Renderer2 } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  title = "Teachup.io";

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const loader = this.renderer.selectRootElement("#loader");
    this.renderer.setStyle(loader, "display", "none");
  }
}
