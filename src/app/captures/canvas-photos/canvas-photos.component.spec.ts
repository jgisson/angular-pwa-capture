import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasPhotosComponent } from './canvas-photos.component';

describe('CanvasPhotosComponent', () => {
  let component: CanvasPhotosComponent;
  let fixture: ComponentFixture<CanvasPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasPhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
