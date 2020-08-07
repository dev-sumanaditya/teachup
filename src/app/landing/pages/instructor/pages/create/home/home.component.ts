import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modules = {};
  content = '';

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    showTodayBtn: false,
    markCurrentDay: true,
    minYear: 2020,
    maxYear: 2022,
    openSelectorOnInputClick: true
  };
  public editorStyle = {
    height: '400px',
    backgroundColor: '#fff',
    'max-width': '720px'
  };

  // Initialized to specific date (09.10.2018).
  public model;
  public uploading = false;


  constructor() {
    this.modules = {
      toolbar: [
        ['bold', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
      ]
    };
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  ngOnInit(): void {
  }

  changedEditor($event) {
    // console.log($event);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  loadImageFailed() {
    alert('failed to load image');
  }
  uploadImage() {
    this.imageChangedEvent = null;
    this.uploading = true;
  }
}
