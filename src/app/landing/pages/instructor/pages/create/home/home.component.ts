import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  public lessons = [];
  public lessonForm: FormGroup;
  public lessonSubmitted = false;
  public lessonError = '';

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.lessonForm = this.fb.group({
      lessonName: [
        '',
        [
          Validators.required,
          Validators.maxLength(60),
          Validators.minLength(10),
        ],
      ],
      lessonDuration: [
        '',
        [
          Validators.required,
          Validators.min(10),
          Validators.max(360),
          Validators.pattern('^[1-9][0-9]*0$')
        ],
      ],
    });

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

  get LessonFormControl() {
    return this.lessonForm.controls;
  }

  onSubmit() {
    this.lessonSubmitted = true;
    if (this.lessonForm.valid) {
      this.addLesson(this.lessonForm.value.lessonName, this.lessonForm.value.lessonDuration);
    } else {
      return;
    }
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

  addLesson(nm, dtn) {
    this.lessons.push({id: Math.floor(Math.random() * 9999999), name: nm, duration: dtn});
    this.lessonSubmitted = false;
  }
  removeLesson(id) {
    const filteredArray = this.lessons.filter((item) => { return item.id !== id; });
    this.lessons = filteredArray;
  }
}
