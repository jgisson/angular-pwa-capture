import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SignaturePadModule } from 'angular2-signaturepad';
import { CanvasPhotosComponent } from './captures/canvas-photos/canvas-photos.component';
import { ColorPickerModule } from 'ngx-color-picker';

const MatModules = [
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatMenuModule
];

@NgModule({

  declarations: [
    AppComponent,
    CanvasPhotosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatModules,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NoopAnimationsModule,
    SignaturePadModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
