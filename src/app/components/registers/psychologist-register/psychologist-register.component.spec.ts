import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologistRegisterComponent } from './psychologist-register.component';

describe('PsychologistRegisterComponent', () => {
  let component: PsychologistRegisterComponent;
  let fixture: ComponentFixture<PsychologistRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychologistRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychologistRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
