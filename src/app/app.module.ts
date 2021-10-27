import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SignaturePadModule } from 'angular2-signaturepad';
import { CanvasPhotosComponent } from './captures/canvas-photos/canvas-photos.component';
import { ColorPickerModule } from 'ngx-color-picker';

const MatModules = [
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule
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
