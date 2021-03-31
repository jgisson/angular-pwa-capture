import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-photos',
  templateUrl: './canvas-photos.component.html',
  styleUrls: ['./canvas-photos.component.scss']
})
export class CanvasPhotosComponent implements OnInit {


  @ViewChild('video')
  video: ElementRef;
  @ViewChild('canvas')
  canvas: ElementRef;

  private constraints = {
    video: true,
  };
  displayStream: boolean;
  width: number;
  height: number;

  actions: boolean = false;

  constructor() {
      this.displayStream = true;
  }

  ngOnInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
        this.video.nativeElement.addEventListener('playing', () => {
          const { offsetWidth, offsetHeight } = this.video.nativeElement;
          this.width = offsetWidth;
          this.height = offsetHeight;
          this.actions = true;
        });
      });
    }
  }

  public capture() {
    this.displayStream = false;
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, this.width, this.height);
    this.video.nativeElement.srcObject.getVideoTracks().forEach(track => track.stop());
  }

  public retakePhoto() {
    this.displayStream = true;
    this.actions = false;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
        this.video.nativeElement.addEventListener('playing', () => {
          const { offsetWidth, offsetHeight } = this.video.nativeElement;
          this.width = offsetWidth;
          this.height = offsetHeight;
          this.actions = true;
        });
      });
    }
  }

  public usePhoto() {
    const capture = this.canvas.nativeElement.toDataURL('image/jpeg');
    // TODO something with capture
  }

  ngOnDestroy() {
    this.actions = false;
    if (this.video) {
      this.video.nativeElement.srcObject.getVideoTracks().forEach(track => track.stop());
    }
  }

}
