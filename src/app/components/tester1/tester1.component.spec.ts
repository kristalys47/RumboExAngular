import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tester1Component } from './tester1.component';

describe('Tester1Component', () => {
  let component: Tester1Component;
  let fixture: ComponentFixture<Tester1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tester1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tester1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
