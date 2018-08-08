import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDispComponent } from './image-disp.component';

describe('ImageDispComponent', () => {
  let component: ImageDispComponent;
  let fixture: ComponentFixture<ImageDispComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDispComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
