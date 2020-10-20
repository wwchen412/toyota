import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NricComponent } from './nric.component';

describe('NricComponent', () => {
  let component: NricComponent;
  let fixture: ComponentFixture<NricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
