import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';

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
  @ViewChild('signaturePad')
  signaturePad: SignaturePad;

  private constraints = {
    video: true,
  };
  displayStream: boolean;
  hideCanvas: boolean;
  width: number;
  height: number;

  actions: boolean = false;

  public signaturePadOptions: Object = {
    'minWidth': 5,
    'canvasWidth': 420,
    'canvasHeight': 300
  };

  constructor() {
      this.displayStream = true;
      this.hideCanvas = true;
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

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    this.signaturePad.set('maxWidth', 1);
    // this.signaturePad.set('canvasWidth', this.width);
    // this.signaturePad.set('canvasHeight', this.height);
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  public capture() {
    this.displayStream = false;
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, this.width, this.height);
    this.signaturePad.fromDataURL(this.canvas.nativeElement.toDataURL());
    this.video.nativeElement.srcObject.getVideoTracks().forEach(track => track.stop());
    this.signaturePad.on();
  }

  public retakePhoto() {
    this.signaturePad.off();
    this.signaturePad.clear();
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
    const capture = this.signaturePad.toDataURL('image/jpeg');
    // TODO something with capture
  }

  ngOnDestroy() {
    this.actions = false;
    if (this.video) {
      this.video.nativeElement.srcObject.getVideoTracks().forEach(track => track.stop());
    }
  }

}
