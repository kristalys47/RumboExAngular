import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounselorRegisterComponent } from './counselor-register.component';

describe('CounselorRegisterComponent', () => {
  let component: CounselorRegisterComponent;
  let fixture: ComponentFixture<CounselorRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounselorRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounselorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
