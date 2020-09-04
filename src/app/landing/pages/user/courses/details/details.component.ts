import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  goback() {
    this.location.back();
  }
}
