import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  modules = {};
  content = "";

  public editorStyle = {
    height: "400px",
    backgroundColor: "#fff",
    "max-width": "720px",
  };

  constructor() {}

  ngOnInit(): void {
    this.modules = {
      toolbar: [
        ["bold", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
      ],
    };
  }
}
