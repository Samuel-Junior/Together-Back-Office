import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogvalidateComponent } from './dialogvalidate.component';

describe('DialogvalidateComponent', () => {
  let component: DialogvalidateComponent;
  let fixture: ComponentFixture<DialogvalidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogvalidateComponent]
    });
    fixture = TestBed.createComponent(DialogvalidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
