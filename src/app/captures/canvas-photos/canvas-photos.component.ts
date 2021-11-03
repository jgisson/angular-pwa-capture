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

  videoDevices: MediaDeviceInfo[] = [];
  selectedFacingMode: string = "environment";
  displayStream: boolean;
  hideCanvas: boolean;
  // Video and photo 4/3
  width: number = window.innerWidth - 30;
  height: number = this.width * 0.75;
  streamWidth: number;
  streamHeight: number
  streamRatio: number;
  streamFacingMode: string;
  streamFrameRate: number;

  actions: boolean = false;
  editing: boolean = false;

  public signaturePadOptions: Object = {
    'canvasWidth': this.width,
    'canvasHeight': this.height
  };

  currentFile: File = null;
  currentFilename: string = null;

  constructor() {
    this.hideCanvas = true;
    this.actions = true;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    this.signaturePad.set('maxWidth', 1);
    // this.signaturePad.set('canvasWidth', this.width);
    // this.signaturePad.set('canvasHeight', this.height);
    this.signaturePad.off(); // invoke functions from szimek/signature_pad API
  }

  stopMediaTracks() {
    this.video.nativeElement.srcObject.getVideoTracks().forEach(track => track.stop());
  }

  public switchCamera(event, facingMode) {
    console.log("selected facingMode: " + facingMode);

    this.selectedFacingMode = facingMode;
    this.stopMediaTracks();
    this.initCamera();
  }

  public takePhoto() {
    this.signaturePad.off();
    this.signaturePad.clear();
    this.displayStream = true;
    this.actions = false;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      this.initCamera();
    } else {
      alert('Can not enable camera !');
    }
  }

  public initCamera() {
    let constraints = { video: { "width": this.height, "height": this.width, facingMode: this.selectedFacingMode } };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      stream.getVideoTracks().forEach(videoTrack => {
        let mediaTrackSettings = videoTrack.getSettings();
        this.streamFacingMode = mediaTrackSettings.facingMode;
        this.streamWidth = mediaTrackSettings.width;
        this.streamHeight = mediaTrackSettings.height;
        this.streamRatio = mediaTrackSettings.aspectRatio;
        this.streamFrameRate = mediaTrackSettings.frameRate;
        // Swap width and height for use portrait orientation
        if (this.streamHeight > this.streamWidth) {
          console.log('Swap width and height for use portrait orientation');
          let trackConstraints = videoTrack.getConstraints();
          trackConstraints.width = this.width;
          trackConstraints.height = this.height;
          videoTrack.applyConstraints(trackConstraints).then(track =>  {
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.play();
            this.video.nativeElement.addEventListener('playing', () => {
              this.actions = true;
            });
          });
        } else {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.video.nativeElement.addEventListener('playing', () => {
            this.actions = true;
          });
        }
      });
    })
    .catch(function(err) {
      alert(`Can not init cam (${err.name})`);
    });

  }

  public capture() {
    this.displayStream = false;
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, this.width, this.height);
    this.signaturePad.fromDataURL(this.canvas.nativeElement.toDataURL());
    this.stopMediaTracks();
  }

  public editImage() {
    this.actions = false;
    this.editing = true;
    this.signaturePad.on();
  }

  public saveEditing() {
    this.signaturePad.off();
    this.editing = false;
    this.actions = true;
  }

  /* public usePhoto() {
    const capture = this.signaturePad.toDataURL('image/jpeg');
    // TODO something with capture
  } */

  public saveAsPNG() {
    if (this.signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      const dataURL = this.signaturePad.toDataURL();
      this.download(dataURL, "capture.png");
    }
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.currentFilename = file.name;
      const dataURL = window.URL.createObjectURL(file);
      this.signaturePad.clear();
      this.signaturePad.fromDataURL(dataURL);
    }
  }

  public download(dataURL, filename) {
    const blob = this.dataURLToBlob(dataURL)
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  public changePenColor(color: string) {
    console.log('Color changed:', color);
    this.signaturePad.set('penColor', color);
  }

  public dataURLToBlob(dataURL) {
    const parts = dataURL.split('base64,')
    const contentType = parts[0].split(":")[1]
    const raw = window.atob(parts[1])
    const rawLength = raw.length
    const uInt8Array = new Uint8Array(rawLength)

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i)
    }

    return new Blob([uInt8Array], { type: contentType })
  }

  ngOnDestroy() {
    this.actions = false;
    if (this.video) {
      this.stopMediaTracks();
    }
  }

}
