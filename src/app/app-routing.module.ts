import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CanvasPhotosComponent } from './captures/canvas-photos/canvas-photos.component';

const routes: Routes = [
  {
    path: '',
    component: CanvasPhotosComponent,
    children: [
      {
        path: 'photos',
        component: CanvasPhotosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
