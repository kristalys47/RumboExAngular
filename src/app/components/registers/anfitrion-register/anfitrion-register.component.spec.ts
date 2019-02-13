import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnfitrionRegisterComponent } from './anfitrion-register.component';

describe('AnfitrionRegisterComponent', () => {
  let component: AnfitrionRegisterComponent;
  let fixture: ComponentFixture<AnfitrionRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnfitrionRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnfitrionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
