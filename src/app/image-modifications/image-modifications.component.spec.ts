import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageModificationsComponent } from './image-modifications.component';

describe('ImageModificationsComponent', () => {
  let component: ImageModificationsComponent;
  let fixture: ComponentFixture<ImageModificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageModificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageModificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
